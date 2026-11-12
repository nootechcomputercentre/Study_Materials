# NOOTECH Study Material Portal — Phase 1

Frontend prototype for the Nootech Computer Centre Study Material Portal.

## Included
- `index.html` — public landing page, announcement ticker, live clock, theme toggle and student access modal.
- `admin.html` — admin dashboard UI and upload/notice form previews.
- `student.html` — student dashboard UI preview.
- `reader.html` — PDF reader layout preview.
- `css/style.css` — responsive light/dark theme design.
- `js/app.js` — frontend interactions and preview validation.

## Run locally
Open `index.html` in a modern browser. No build tools are required.

## GitHub Pages deployment
1. Copy the `study-portal` folder into the root of your existing `main-site` repository.
2. Commit and push the folder.
3. If GitHub Pages is already enabled for the repository root, open:
   `https://YOUR-GITHUB-USERNAME.github.io/main-site/study-portal/`
4. Replace the placeholder institute logo at `assets/images/nootech-logo.png` with the approved logo file.

## Phase 1 limitations
This is a frontend-only prototype. It does not authenticate students, upload files, connect to Google Drive/Sheets, or provide protected PDF delivery. The admin and student screens use illustrative placeholders. Do not use this prototype to store real student data or confidential files.

## Planned integration
Google Apps Script will provide server-side authentication, registration validation, Drive upload, Sheets records, access-code verification, notices and authenticated PDF delivery. Drive files must remain private; never expose privileged credentials in frontend JavaScript.
