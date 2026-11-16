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


## Student authentication integration (Phase 2)

This update connects the student sign-in form to the Cloudflare Worker:
- `POST /api/student/verify` checks registration number, SHA-256 access-code hash and ACTIVE status.
- `GET /api/student/session` validates the one-hour session and re-checks the current student account status.
- `POST /api/student/logout` revokes the current session.
- The browser stores the session token in `sessionStorage`, not persistent `localStorage`.
- The Student Dashboard only loads the catalogue after session validation and filters materials by the student's Course_ID and Batch_Name.

### Deployment order
1. Back up the current Cloudflare Worker source.
2. Replace Worker code with `cloudflare-worker.js` from this package and deploy.
3. Upload the updated portal files to the existing GitHub Pages repository, preserving the `data/materials.json` catalogue.
4. Test using a test student record and access code.

### Important access-control note
`data/materials.json` is public static metadata on GitHub Pages. This update filters the dashboard catalogue for the signed-in student's course and batch, but that filter is not a security boundary. Google Drive file permissions remain the enforcement layer for opening each PDF. Grant Viewer access only to the intended student Google accounts. The portal does not automatically share Drive files.
