(() => {
  "use strict";
  const API_BASE = "https://nootech-study-api.nootechcomputercentre.workers.dev";
  const SESSION_KEY = "NOOTECH_STUDENT_SESSION";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const savedTheme = localStorage.getItem("nootech-study-theme");
  if (savedTheme === "dark") document.documentElement.setAttribute("data-theme", "dark");
  const themeToggle = $("#themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const dark = document.documentElement.getAttribute("data-theme") !== "dark";
      document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
      localStorage.setItem("nootech-study-theme", dark ? "dark" : "light");
      themeToggle.textContent = dark ? "☾" : "☼";
    });
    themeToggle.textContent = savedTheme === "dark" ? "☾" : "☼";
  }

  const updateClock = () => {
    const now = new Date();
    const clock = $("#liveClock"), date = $("#liveDate"), adminDate = $("#adminDate");
    if (clock) clock.textContent = new Intl.DateTimeFormat("en-IN", {hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true}).format(now);
    if (date) date.textContent = new Intl.DateTimeFormat("en-IN", {day:"2-digit",month:"short",year:"numeric"}).format(now);
    if (adminDate) adminDate.textContent = new Intl.DateTimeFormat("en-IN", {day:"2-digit",month:"short",year:"numeric"}).format(now);
  };
  updateClock();
  setInterval(updateClock, 1000);
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  const modal = $("#accessModal");
  const openModal = () => {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => $("#registrationNo")?.focus(), 50);
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  $$("[data-open-access]").forEach(el => el.addEventListener("click", event => { event.preventDefault(); openModal(); }));
  $("#modalClose")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

  // Student login: registration number + access code are verified by the Cloudflare Worker.
  $("#accessForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const registrationNo = $("#registrationNo")?.value.trim() || "";
    const accessCode = $("#accessCode")?.value.trim() || "";
    const button = $("#accessSubmit");
    const feedback = $("#loginFeedback");
    if (!registrationNo || !accessCode) {
      if (feedback) feedback.textContent = "Enter both your registration number and student access code.";
      return;
    }
    if (button) { button.disabled = true; button.textContent = "Verifying…"; }
    if (feedback) feedback.textContent = "Checking your student record securely…";
    try {
      const response = await fetch(`${API_BASE}/api/student/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNo, accessCode })
      });
      const result = await response.json();
      if (!response.ok || !result.success || !result.sessionToken) {
        throw new Error(result.error || "Student verification failed. Please try again.");
      }
      sessionStorage.setItem(SESSION_KEY, result.sessionToken);
      if (feedback) feedback.textContent = "Verification successful. Opening your dashboard…";
      window.location.href = "student.html";
    } catch (error) {
      if (feedback) feedback.textContent = error.message || "Unable to connect. Check your internet connection and try again.";
    } finally {
      if (button) { button.disabled = false; button.innerHTML = 'Verify & Continue <span>→</span>'; }
    }
  });

  // Admin form validation preview only; no claim of upload/publishing is made.
  $("#uploadPreviewForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const file = $('input[type="file"]', event.currentTarget)?.files?.[0];
    const feedback = $("#uploadFeedback");
    if (!file || file.type !== "application/pdf") {
      if (feedback) feedback.textContent = "Please select a valid PDF file.";
      return;
    }
    if (feedback) feedback.textContent = "Form validation passed. File has not been uploaded; Drive integration is pending.";
  });
  $("#noticePreview")?.addEventListener("click", () => {
    const text = $("#noticeDraft")?.value.trim();
    const feedback = $("#noticeFeedback");
    if (feedback) feedback.textContent = text ? `Preview ready: “${text}” (not published).` : "Enter notice text first.";
  });

  const showCardsMessage = (container, heading, message) => {
    if (!container) return;
    container.replaceChildren();
    const box = document.createElement("div"); box.className = "material-empty";
    const icon = document.createElement("div"); icon.className = "empty-icon"; icon.textContent = "▤";
    const title = document.createElement("h3"); title.textContent = heading;
    const desc = document.createElement("p"); desc.textContent = message;
    box.append(icon, title, desc); container.append(box);
  };

  // Admin library remains a read-only catalogue preview.
  const adminMaterialList = $("#adminMaterialList");
  if (adminMaterialList) {
    const count = $("#adminMaterialCount"), status = $("#adminCatalogueStatus");
    fetch("./data/materials.json", {cache:"no-store"})
      .then(response => { if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`); return response.json(); })
      .then(data => {
        const records = Array.isArray(data.materials) ? data.materials.filter(item => item.status === "published") : [];
        if (count) { count.className = "admin-library-count"; count.textContent = `${records.length} published material${records.length === 1 ? "" : "s"}`; }
        if (status) { status.className = "admin-library-updated"; status.textContent = `Updated ${data.updatedAt || "date unavailable"}`; }
        adminMaterialList.replaceChildren();
        if (!records.length) { showCardsMessage(adminMaterialList, "No published materials", "Add a published record to data/materials.json to display it here."); return; }
        records.forEach(item => {
          const card = document.createElement("article"); card.className = "material-card admin-material-card";
          const top = document.createElement("div"); top.className = "material-card-top";
          const pdf = document.createElement("span"); pdf.className = "material-pdf-icon"; pdf.textContent = "PDF";
          const id = document.createElement("small"); id.textContent = item.materialId || "STUDY MATERIAL"; top.append(pdf,id);
          const title = document.createElement("h3"); title.textContent = item.title || "Untitled material";
          const details = document.createElement("p"); details.className = "material-card-details"; details.textContent = [item.courseName || item.courseCode,item.batchName,item.subject].filter(Boolean).join(" · ") || "No additional details";
          const access = document.createElement("p"); access.className = "material-access-note"; access.textContent = "Restricted Google Drive file · Access is enforced by Google Drive.";
          const link = document.createElement("a"); link.className = "btn btn-primary material-open-link"; link.textContent = "Open PDF ↗";
          try { const url = new URL(item.driveUrl); if (url.protocol !== "https:" || url.hostname !== "drive.google.com") throw new Error("Invalid URL"); link.href = url.href; link.target = "_blank"; link.rel = "noopener noreferrer"; }
          catch { link.textContent = "Invalid PDF link"; link.classList.add("is-disabled"); link.setAttribute("aria-disabled","true"); }
          card.append(top,title,details,access,link); adminMaterialList.append(card);
        });
      })
      .catch(error => { console.error("Admin catalogue load failed:",error); if (count) count.textContent = "Catalogue unavailable"; if (status) status.textContent = ""; showCardsMessage(adminMaterialList, "Unable to load materials", "Check that data/materials.json exists in the repository and redeploy the site."); });
  }

  // Student dashboard: do not render catalogue until the Worker validates the session.
  const materialList = $("#materialList");
  if (materialList) {
    const searchInput = $("#materialSearch"), courseFilter = $("#courseFilter"), batchFilter = $("#batchFilter");
    const countLabel = $("#materialCount"), statusLabel = $("#catalogueStatus");
    let materials = [], authenticatedStudent = null;

    const option = (value, label) => {
      const el = document.createElement("option"); el.value = value; el.textContent = label; return el;
    };
    const render = () => {
      const term = (searchInput?.value || "").trim().toLowerCase();
      const course = courseFilter?.value || "";
      const batch = batchFilter?.value || "";
      const visible = materials.filter(item => {
        const text = [item.title,item.courseName,item.courseCode,item.batchName,item.subject].filter(Boolean).join(" ").toLowerCase();
        const sameCourse = item.courseCode === authenticatedStudent.courseId;
        const sameBatch = !authenticatedStudent.batchName || item.batchName === authenticatedStudent.batchName;
        return item.status === "published" && sameCourse && sameBatch &&
          (!course || item.courseCode === course) && (!batch || item.batchName === batch) &&
          (!term || text.includes(term));
      });
      if (countLabel) countLabel.textContent = `${visible.length} material${visible.length === 1 ? "" : "s"} found`;
      const availableCount = $("#availableCount");
      if (availableCount) availableCount.textContent = String(visible.length);
      materialList.replaceChildren();
      if (!visible.length) { showCardsMessage(materialList, "No materials available yet", "No published materials currently match your enrolled course and batch. Please contact the centre if you think this is incorrect."); return; }
      visible.forEach(item => {
        const card = document.createElement("article"); card.className = "material-card";
        const top = document.createElement("div"); top.className = "material-card-top";
        const pdf = document.createElement("span"); pdf.className = "material-pdf-icon"; pdf.textContent = "PDF";
        const id = document.createElement("small"); id.textContent = item.materialId || "STUDY MATERIAL"; top.append(pdf,id);
        const title = document.createElement("h3"); title.textContent = item.title || "Untitled material";
        const details = document.createElement("p"); details.className = "material-card-details"; details.textContent = [item.courseName || item.courseCode,item.batchName,item.subject].filter(Boolean).join(" · ");
        const note = document.createElement("p"); note.className = "material-access-note"; note.textContent = "Restricted Google Drive file · Google Drive checks your signed-in account's permission.";
        const link = document.createElement("a"); link.className = "btn btn-primary material-open-link"; link.textContent = "Open PDF ↗";
        try { const url = new URL(item.driveUrl); if (url.protocol !== "https:" || url.hostname !== "drive.google.com") throw new Error("Invalid URL"); link.href = url.href; link.target = "_blank"; link.rel = "noopener noreferrer"; }
        catch { link.textContent = "Invalid PDF link"; link.classList.add("is-disabled"); link.setAttribute("aria-disabled","true"); }
        card.append(top,title,details,note,link); materialList.append(card);
      });
    };

    const validateSession = async () => {
      const token = sessionStorage.getItem(SESSION_KEY);
      if (!token) throw new Error("No active student session. Please sign in.");
      const response = await fetch(`${API_BASE}/api/student/session`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      if (!response.ok || !result.success || !result.student) {
        sessionStorage.removeItem(SESSION_KEY);
        throw new Error(result.error || "Your session is no longer valid. Please sign in again.");
      }
      return result.student;
    };

    const populateProfile = student => {
      const name = student.studentName || "Student";
      const initial = name.trim().charAt(0).toUpperCase() || "S";
      const setText = (selector, value) => { const el = $(selector); if (el) el.textContent = value || "—"; };
      setText("#welcomeName", name);
      setText("#studentInitial", initial);
      setText("#profileInitial", initial);
      setText("#profileName", name);
      setText("#profileRegistration", student.registrationNo);
      setText("#profileCourse", student.courseName);
      setText("#profileBatch", student.batchName);
      setText("#profileYear", student.academicYear);
      setText("#accountStatus", "ACTIVE");
      setText("#studentStatus", "VERIFIED STUDENT");
      setText("#studentNotice", "Your student identity has been verified. Study materials below are filtered to your enrolled course and batch.");
    };

    const loadCatalogue = async () => {
      const response = await fetch("./data/materials.json", {cache:"no-store"});
      if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`);
      const data = await response.json();
      materials = Array.isArray(data.materials) ? data.materials : [];
      const courseMatches = materials.filter(item => item.courseCode === authenticatedStudent.courseId);
      const courseName = authenticatedStudent.courseName || authenticatedStudent.courseId;
      if (courseFilter) {
        courseFilter.replaceChildren(option(authenticatedStudent.courseId, courseName));
        courseFilter.value = authenticatedStudent.courseId;
      }
      if (batchFilter) {
        batchFilter.replaceChildren(option(authenticatedStudent.batchName || "", authenticatedStudent.batchName || "All batches"));
        batchFilter.value = authenticatedStudent.batchName || "";
      }
      if (statusLabel) statusLabel.textContent = `Catalogue updated ${data.updatedAt || "recently"}`;
      render();
    };

    validateSession()
      .then(student => {
        authenticatedStudent = student;
        populateProfile(student);
        return loadCatalogue();
      })
      .catch(error => {
        console.error("Student dashboard access failed:", error);
        sessionStorage.removeItem(SESSION_KEY);
        if (countLabel) countLabel.textContent = "Student verification required";
        if (statusLabel) statusLabel.textContent = "";
        showCardsMessage(materialList, "Unable to open student dashboard", `${error.message} You will be returned to the sign-in page.`);
        const notice = $("#studentNotice");
        if (notice) notice.textContent = error.message;
        setTimeout(() => { window.location.replace("index.html"); }, 1800);
      });

    searchInput?.addEventListener("input",render);
    courseFilter?.addEventListener("change",render);
    batchFilter?.addEventListener("change",render);

    $("#studentLogout")?.addEventListener("click", async () => {
      const token = sessionStorage.getItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      try {
        if (token) await fetch(`${API_BASE}/api/student/logout`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` }
        });
      } catch (error) { console.warn("Logout request could not reach the server.", error); }
      window.location.replace("index.html");
    });
  }
})();
