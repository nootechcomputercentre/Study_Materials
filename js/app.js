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