(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Persistent visual theme preference.
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

  // Live local date and time.
  const updateClock = () => {
    const now = new Date();
    const clock = $("#liveClock");
    const date = $("#liveDate");
    const adminDate = $("#adminDate");
    if (clock) clock.textContent = new Intl.DateTimeFormat("en-IN", {hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:true}).format(now);
    if (date) date.textContent = new Intl.DateTimeFormat("en-IN", {day:"2-digit", month:"short", year:"numeric"}).format(now);
    if (adminDate) adminDate.textContent = new Intl.DateTimeFormat("en-IN", {day:"2-digit", month:"short", year:"numeric"}).format(now);
  };
  updateClock();
  setInterval(updateClock, 1000);
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Student access modal: UI preview only; no authentication is performed.
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
  $("#accessForm")?.addEventListener("submit", event => {
    event.preventDefault();
    alert("Phase 1 preview: student verification will be connected to the Google Apps Script backend in a later phase. No login has been performed.");
  });

  // Admin form validation preview only.
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

  // Search box placeholder behavior until live materials are connected.
  $("#materialSearch")?.addEventListener("input", event => {
    const empty = $(".material-empty");
    if (empty && event.target.value.trim()) {
      const p = $("p", empty);
      if (p) p.textContent = "The live material catalogue will be searchable after the database is connected.";
    }
  });
})();

// script codes for student page

(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Persistent visual theme preference.
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

  // Live local date and time.
  const updateClock = () => {
    const now = new Date();
    const clock = $("#liveClock");
    const date = $("#liveDate");
    const adminDate = $("#adminDate");
    if (clock) clock.textContent = new Intl.DateTimeFormat("en-IN", {hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:true}).format(now);
    if (date) date.textContent = new Intl.DateTimeFormat("en-IN", {day:"2-digit", month:"short", year:"numeric"}).format(now);
    if (adminDate) adminDate.textContent = new Intl.DateTimeFormat("en-IN", {day:"2-digit", month:"short", year:"numeric"}).format(now);
  };
  updateClock();
  setInterval(updateClock, 1000);
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Student access modal: UI preview only; no authentication is performed.
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
  $("#accessForm")?.addEventListener("submit", event => {
    event.preventDefault();
    alert("Phase 1 preview: student verification will be connected to the Google Apps Script backend in a later phase. No login has been performed.");
  });

  // Admin form validation preview only.
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

  // Load published catalogue metadata. Google Drive enforces actual file permissions.
  const materialList = $("#materialList");
  if (materialList) {
    const searchInput = $("#materialSearch");
    const courseFilter = $("#courseFilter");
    const batchFilter = $("#batchFilter");
    const countLabel = $("#materialCount");
    const statusLabel = $("#catalogueStatus");
    let materials = [];

    const option = (value, label) => {
      const el = document.createElement("option");
      el.value = value; el.textContent = label; return el;
    };
    const showMessage = (heading, message) => {
      materialList.replaceChildren();
      const box = document.createElement("div"); box.className = "material-empty";
      const icon = document.createElement("div"); icon.className = "empty-icon"; icon.textContent = "▤";
      const title = document.createElement("h3"); title.textContent = heading;
      const desc = document.createElement("p"); desc.textContent = message;
      box.append(icon, title, desc); materialList.append(box);
    };
    const render = () => {
      const term = (searchInput?.value || "").trim().toLowerCase();
      const course = courseFilter?.value || "";
      const batch = batchFilter?.value || "";
      const visible = materials.filter(item => {
        const text = [item.title,item.courseName,item.courseCode,item.batchName,item.subject].filter(Boolean).join(" ").toLowerCase();
        return item.status === "published" && (!course || item.courseCode === course) && (!batch || item.batchName === batch) && (!term || text.includes(term));
      });
      if (countLabel) countLabel.textContent = `${visible.length} material${visible.length === 1 ? "" : "s"} found`;
      materialList.replaceChildren();
      if (!visible.length) { showMessage("No matching materials found", "Try another search term or change the course and batch filters."); return; }
      visible.forEach(item => {
        const card = document.createElement("article"); card.className = "material-card";
        const top = document.createElement("div"); top.className = "material-card-top";
        const pdf = document.createElement("span"); pdf.className = "material-pdf-icon"; pdf.textContent = "PDF";
        const id = document.createElement("small"); id.textContent = item.materialId || "STUDY MATERIAL"; top.append(pdf,id);
        const title = document.createElement("h3"); title.textContent = item.title || "Untitled material";
        const details = document.createElement("p"); details.className = "material-card-details"; details.textContent = [item.courseName || item.courseCode,item.batchName,item.subject].filter(Boolean).join(" · ");
        const note = document.createElement("p"); note.className = "material-access-note"; note.textContent = "Restricted Google Drive file · Sign in with an authorized Google account.";
        const link = document.createElement("a"); link.className = "btn btn-primary material-open-link"; link.textContent = "Open PDF ↗";
        try { const url = new URL(item.driveUrl); if (url.protocol !== "https:" || url.hostname !== "drive.google.com") throw new Error("Invalid URL"); link.href = url.href; link.target = "_blank"; link.rel = "noopener noreferrer"; }
        catch { link.textContent = "Invalid PDF link"; link.classList.add("is-disabled"); link.setAttribute("aria-disabled","true"); }
        card.append(top,title,details,note,link); materialList.append(card);
      });
    };
    fetch("./data/materials.json", {cache:"no-store"})
      .then(response => { if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`); return response.json(); })
      .then(data => {
        materials = Array.isArray(data.materials) ? data.materials : [];
        const courses = new Map(); const batches = new Set();
        materials.forEach(item => { if (item.courseCode) courses.set(item.courseCode,item.courseName || item.courseCode); if (item.batchName) batches.add(item.batchName); });
        courses.forEach((name,code) => courseFilter?.append(option(code,name)));
        batches.forEach(name => batchFilter?.append(option(name,name)));
        if (statusLabel) statusLabel.textContent = `Catalogue updated ${data.updatedAt || "recently"}`;
        render();
      })
      .catch(error => { console.error("Catalogue load failed:",error); if (countLabel) countLabel.textContent = "Catalogue unavailable"; showMessage("Unable to load study materials", "Check that data/materials.json exists in the GitHub repository and that the site has been redeployed."); });
    searchInput?.addEventListener("input",render); courseFilter?.addEventListener("change",render); batchFilter?.addEventListener("change",render);
  }

})();

//Admin page js script
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Persistent visual theme preference.
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

  // Live local date and time.
  const updateClock = () => {
    const now = new Date();
    const clock = $("#liveClock");
    const date = $("#liveDate");
    const adminDate = $("#adminDate");
    if (clock) clock.textContent = new Intl.DateTimeFormat("en-IN", {hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:true}).format(now);
    if (date) date.textContent = new Intl.DateTimeFormat("en-IN", {day:"2-digit", month:"short", year:"numeric"}).format(now);
    if (adminDate) adminDate.textContent = new Intl.DateTimeFormat("en-IN", {day:"2-digit", month:"short", year:"numeric"}).format(now);
  };
  updateClock();
  setInterval(updateClock, 1000);
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Student access modal: UI preview only; no authentication is performed.
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
  $("#accessForm")?.addEventListener("submit", event => {
    event.preventDefault();
    alert("Phase 1 preview: student verification will be connected to the Google Apps Script backend in a later phase. No login has been performed.");
  });

  // Admin form validation preview only.
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

  // Admin library: read-only view of the same published JSON catalogue.
  const adminMaterialList = $("#adminMaterialList");
  if (adminMaterialList) {
    const count = $("#adminMaterialCount");
    const status = $("#adminCatalogueStatus");
    const showAdminMessage = (heading, message) => {
      adminMaterialList.replaceChildren();
      const box = document.createElement("div"); box.className = "material-empty";
      const icon = document.createElement("div"); icon.className = "empty-icon"; icon.textContent = "▤";
      const title = document.createElement("h3"); title.textContent = heading;
      const desc = document.createElement("p"); desc.textContent = message;
      box.append(icon, title, desc); adminMaterialList.append(box);
    };
    fetch("./data/materials.json", {cache:"no-store"})
      .then(response => { if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`); return response.json(); })
      .then(data => {
        const records = Array.isArray(data.materials) ? data.materials.filter(item => item.status === "published") : [];
        if (count) count.textContent = `${records.length} published material${records.length === 1 ? "" : "s"}`;
        if (status) status.textContent = `Updated ${data.updatedAt || "date unavailable"}`;
        adminMaterialList.replaceChildren();
        if (!records.length) { showAdminMessage("No published materials", "Add a published record to data/materials.json to display it here."); return; }
        records.forEach(item => {
          const card = document.createElement("article"); card.className = "material-card";
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
      .catch(error => { console.error("Admin catalogue load failed:",error); if (count) count.textContent = "Catalogue unavailable"; if (status) status.textContent = ""; showAdminMessage("Unable to load materials", "Check that data/materials.json exists in the repository and redeploy the site."); });
  }

  // Load published catalogue metadata. Google Drive enforces actual file permissions.
  const materialList = $("#materialList");
  if (materialList) {
    const searchInput = $("#materialSearch");
    const courseFilter = $("#courseFilter");
    const batchFilter = $("#batchFilter");
    const countLabel = $("#materialCount");
    const statusLabel = $("#catalogueStatus");
    let materials = [];

    const option = (value, label) => {
      const el = document.createElement("option");
      el.value = value; el.textContent = label; return el;
    };
    const showMessage = (heading, message) => {
      materialList.replaceChildren();
      const box = document.createElement("div"); box.className = "material-empty";
      const icon = document.createElement("div"); icon.className = "empty-icon"; icon.textContent = "▤";
      const title = document.createElement("h3"); title.textContent = heading;
      const desc = document.createElement("p"); desc.textContent = message;
      box.append(icon, title, desc); materialList.append(box);
    };
    const render = () => {
      const term = (searchInput?.value || "").trim().toLowerCase();
      const course = courseFilter?.value || "";
      const batch = batchFilter?.value || "";
      const visible = materials.filter(item => {
        const text = [item.title,item.courseName,item.courseCode,item.batchName,item.subject].filter(Boolean).join(" ").toLowerCase();
        return item.status === "published" && (!course || item.courseCode === course) && (!batch || item.batchName === batch) && (!term || text.includes(term));
      });
      if (countLabel) countLabel.textContent = `${visible.length} material${visible.length === 1 ? "" : "s"} found`;
      materialList.replaceChildren();
      if (!visible.length) { showMessage("No matching materials found", "Try another search term or change the course and batch filters."); return; }
      visible.forEach(item => {
        const card = document.createElement("article"); card.className = "material-card";
        const top = document.createElement("div"); top.className = "material-card-top";
        const pdf = document.createElement("span"); pdf.className = "material-pdf-icon"; pdf.textContent = "PDF";
        const id = document.createElement("small"); id.textContent = item.materialId || "STUDY MATERIAL"; top.append(pdf,id);
        const title = document.createElement("h3"); title.textContent = item.title || "Untitled material";
        const details = document.createElement("p"); details.className = "material-card-details"; details.textContent = [item.courseName || item.courseCode,item.batchName,item.subject].filter(Boolean).join(" · ");
        const note = document.createElement("p"); note.className = "material-access-note"; note.textContent = "Restricted Google Drive file · Sign in with an authorized Google account.";
        const link = document.createElement("a"); link.className = "btn btn-primary material-open-link"; link.textContent = "Open PDF ↗";
        try { const url = new URL(item.driveUrl); if (url.protocol !== "https:" || url.hostname !== "drive.google.com") throw new Error("Invalid URL"); link.href = url.href; link.target = "_blank"; link.rel = "noopener noreferrer"; }
        catch { link.textContent = "Invalid PDF link"; link.classList.add("is-disabled"); link.setAttribute("aria-disabled","true"); }
        card.append(top,title,details,note,link); materialList.append(card);
      });
    };
    fetch("./data/materials.json", {cache:"no-store"})
      .then(response => { if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`); return response.json(); })
      .then(data => {
        materials = Array.isArray(data.materials) ? data.materials : [];
        const courses = new Map(); const batches = new Set();
        materials.forEach(item => { if (item.courseCode) courses.set(item.courseCode,item.courseName || item.courseCode); if (item.batchName) batches.add(item.batchName); });
        courses.forEach((name,code) => courseFilter?.append(option(code,name)));
        batches.forEach(name => batchFilter?.append(option(name,name)));
        if (statusLabel) statusLabel.textContent = `Catalogue updated ${data.updatedAt || "recently"}`;
        render();
      })
      .catch(error => { console.error("Catalogue load failed:",error); if (countLabel) countLabel.textContent = "Catalogue unavailable"; showMessage("Unable to load study materials", "Check that data/materials.json exists in the GitHub repository and that the site has been redeployed."); });
    searchInput?.addEventListener("input",render); courseFilter?.addEventListener("change",render); batchFilter?.addEventListener("change",render);
  }

})();

