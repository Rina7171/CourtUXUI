# Court Management System — UX/UI Screen Inventory

> A screen-by-screen breakdown for Figma prototyping, split across the three application services defined in the system architecture. Each screen lists its **components**, and each component lists the **elements** inside it.

| Application Service | Domain | Audience | Auth |
|---|---|---|---|
| Public Portal | `portal.domain.com` | Public User | None |
| Court Panel | `domain.com` | Court Personnel (Greffier, Chief Greffier) | Required |
| Admin Panel | `admin.domain.com` | Admin | Required |

> **Module mapping:** Public Portal = Module 9. Court Panel = Modules 1–8 (Case, Lawyer & Judge, Hearing, Document, Docket, Participants, Disposition, Greffier). Admin Panel = Module 10 (System User + RBAC).

---

## 0. Shared / Reusable Components

These are global components built once in Figma as a component library, then reused across all three panels. Define them first.

### Status Pill
- Colored label (pill shape)
- Text label (e.g. `Open`, `Pending`, `Closed`, `Appealed`)
- Color variants mapped to status

### Search Bar
- Search input field
- Search icon (leading)
- Clear / reset icon (trailing)
- Placeholder text

### Filter Panel
- Filter group label
- Dropdown / select (e.g. case type, classification)
- Date range picker (from / to)
- Apply button
- Reset button

### Data Table
- Column headers (sortable)
- Sort direction indicator (arrow)
- Table rows
- Row hover / selected state
- Row action menu (⋮ — view / edit / remove)
- Empty state message
- Loading skeleton

### Pagination
- Previous / Next buttons
- Page number buttons
- "Showing X–Y of Z" counter
- Rows-per-page selector

### Modal / Dialog
- Title bar
- Close (✕) icon
- Body content slot
- Primary action button
- Secondary / cancel button
- Overlay backdrop

### Toast / Notification
- Icon (success / error / info / warning)
- Message text
- Dismiss icon
- Auto-dismiss timer (visual)

### Form Field (base)
- Field label
- Input (text / number / textarea)
- Helper text
- Validation error message
- Required indicator (*)

### Button Set
- Primary button
- Secondary button
- Destructive button (e.g. Remove, Deactivate)
- Icon button
- Disabled state

### Breadcrumb
- Path segments (links)
- Separator (`/` or `>`)
- Current page (non-link)

### Empty / Error / Loading States
- Illustration or icon
- Headline text
- Supporting text
- Optional action button

---

## 1. PUBLIC PORTAL — `portal.domain.com`

No authentication. Read-only. Only shows non-confidential data (`cases.is_public = true`, `documents.is_confidential = false`).

### 1.1 Landing / Home

**Components:**
- **Header Bar**
  - Court name / logo
  - Primary nav links (Cases, Hearings, Search)
  - Public access notice
- **Hero / Intro Section**
  - Headline
  - Short description of the portal
  - Global search bar
- **Quick Links Cards**
  - Card: "Browse public cases"
  - Card: "Upcoming public hearings"
- **Footer**
  - About / disclaimer text
  - Contact info

### 1.2 Public Cases List

**Components:**
- **Header Bar** (shared)
- **Search Bar** (by case number or title)
- **Filter Panel**
  - Classification dropdown (Criminal, Civil)
  - Status dropdown
  - Filed-date range picker
- **Cases Table / Card Grid**
  - Case number
  - Case title
  - Classification badge
  - Status pill
  - Filed date
  - "View" link / row click
- **Pagination** (shared)
- **Empty State** ("No public cases match your search")

### 1.3 Public Case Detail

**Components:**
- **Breadcrumb** (Cases / [Case Number])
- **Case Header**
  - Case title
  - Case number
  - Status pill
  - Classification badge
  - Filed date
- **Case Summary Panel**
  - Description (non-confidential only)
  - Assigned judge name (read-only)
- **Parties Panel**
  - List of participants (name + role: Plaintiff / Defendant)
  - *(confidential fields hidden)*
- **Related Hearings List**
  - Hearing type
  - Date / time
  - Courtroom
  - "View hearing" link
- **Disclaimer Banner** ("Public information only")

### 1.4 Public Hearings List

**Components:**
- **Header Bar** (shared)
- **Search Bar** (by case number / hearing type)
- **Filter Panel**
  - Hearing type dropdown (Arraignment, Trial, Bail Hearing, Sentencing)
  - Date range picker
  - Courtroom dropdown
- **Hearings Table**
  - Related case number
  - Hearing type
  - Date / time
  - Courtroom / room number
  - Status
- **Pagination** (shared)

### 1.5 Public Hearing Detail

**Components:**
- **Breadcrumb**
- **Hearing Header**
  - Hearing type
  - Status
  - Linked case number (link to public case detail)
- **Schedule Panel**
  - Date
  - Start time
  - End time
  - Courtroom / room number
- **Back link** (to hearings list)

### 1.6 Global Search Results

**Components:**
- **Search Bar** (sticky, with query)
- **Result Tabs / Toggle** (Cases | Hearings)
- **Results List**
  - Result type badge
  - Title / case number
  - Key meta (date, status)
  - "View" link
- **Filter Panel** (shared)
- **Empty State**

---

## 2. COURT PANEL — `domain.com`

Authenticated. Used by **Greffiers** and **Chief Greffiers**. Some screens (case assignment, supervision) are **Chief Greffier–only** — marked below.

### 2.1 Login

**Components:**
- **Login Card**
  - Logo
  - Username field
  - Password field (show/hide toggle)
  - Login button
  - Inline error message
- **Background / branding panel**

### 2.2 Dashboard

**Components:**
- **Top Nav Bar**
  - Logo
  - Global search
  - Notifications icon
  - User menu (profile, role badge, logout)
- **Side Navigation**
  - Nav items: Cases, Hearings, Documents, Dockets, Participants, Lawyers & Judges, Dispositions, Greffiers
  - Active state highlight
- **Summary Stat Cards**
  - Assigned cases count
  - Upcoming hearings count
  - Pending dispositions count
- **My Assigned Cases Table** (shared data table)
- **Recent Docket Activity Feed**
  - Activity type
  - Description
  - Timestamp

### 2.3 Cases — List & Search

**Components:**
- **Page Header** (title + "New Case" primary button)
- **Search Bar** (case number / title)
- **Filter Panel** (classification, status, date range)
- **Cases Data Table**
  - Case number
  - Title
  - Status pill
  - Classification badge
  - Assigned judge
  - Filed date
  - Row actions (View, Update status)
- **Pagination**

### 2.4 Cases — Create New Case

**Components:**
- **Form Card**
  - Case title field
  - Description textarea
  - Classification dropdown
  - Initial status dropdown
  - "Is public" toggle
  - Filed date picker
- **Action Bar** (Save / Cancel)

### 2.5 Cases — Case Detail (tabbed)

**Components:**
- **Breadcrumb**
- **Case Header**
  - Title, case number, status pill, classification badge
  - "Update status" button (opens dropdown/modal)
  - Filed date / closed date
- **Tab Navigation**
  - Overview | Participants | Hearings | Documents | Docket | Disposition
- **Overview Tab**
  - Case summary panel
  - Assigned judge(s) panel (with "assign judge" action)
  - Assigned greffier panel
- **Participants Tab**
  - Participants table (name, role, representation)
  - "Add participant to case" button
  - "Assign legal representation" action per row
  - "Remove from case" action per row
- **Hearings Tab**
  - Hearings table for this case
  - "Schedule hearing" button
- **Documents Tab**
  - Documents table (type, title, confidential flag)
  - "Add document" button
- **Docket Tab**
  - Docket timeline (see 2.13)
- **Disposition Tab**
  - Disposition summary
  - "Create disposition" button (if none)
  - "File appeal" button (if disposed)

### 2.6 Cases — Update Status (modal)

**Components:**
- **Status Modal**
  - Current status display
  - New status dropdown
  - Note / reason textarea
  - Confirm / Cancel buttons

### 2.7 Cases — Settings: Statuses & Classifications

**Components:**
- **Status Manager Panel**
  - Status list (name + edit/delete)
  - "Add custom status" inline form
- **Classification Manager Panel**
  - Classification list
  - "Add classification" inline form

### 2.8 Hearings — List & Search

**Components:**
- **Page Header** ("Schedule hearing" button)
- **Search Bar** (case number / hearing type)
- **Filter Panel** (hearing type, courtroom, date range, status)
- **Hearings Data Table**
  - Case number
  - Hearing type
  - Date / start–end time
  - Courtroom
  - Status pill
  - Row actions (View, Update status, Reschedule)
- **Pagination**

### 2.9 Hearings — Schedule / Reschedule (modal or form)

**Components:**
- **Hearing Form Card**
  - Case selector (search-as-you-type)
  - Hearing type dropdown
  - Courtroom dropdown
  - Date picker
  - Start time / end time pickers
  - Status dropdown
  - (Reschedule mode) continuance reason textarea
- **Action Bar** (Save / Cancel)

### 2.10 Hearings — Hearing Detail

**Components:**
- **Hearing Header** (type, status pill, linked case)
- **Schedule Panel** (date, start, end, courtroom)
- **Status Update control**
- **Continuance / Reschedule history list**

### 2.11 Documents — Document List (within case)

**Components:**
- **Search & Filter Bar** (by document type)
- **Documents Table**
  - Document type badge (Filing, Motion, Continuance, Evidence, Disposition, Appeal)
  - Title
  - Submitted by
  - Confidential flag
  - Uploaded date
  - Row actions (View, Append metadata)
- **"Add document" button**

### 2.12 Documents — Add / Upload Document

**Components:**
- **Upload Form Card**
  - Document type dropdown (drives dynamic fields)
  - Title field
  - File upload dropzone (file picker, drag-drop, file preview)
  - "Is confidential" toggle
- **Dynamic Metadata Section** (changes by document type)
  - *Filing:* filing category, relief sought
  - *Motion:* request action, argument summary, hearing required toggle
  - *Continuance:* original hearing, new hearing, reason, requested-by party
  - *Evidence:* evidence type, exhibit number, chain-of-custody entry
  - *Disposition:* sentence terms, prejudice status
  - *Appeal:* grounds for appeal, appellate court level
- **Action Bar** (Save / Cancel)

### 2.13 Documents — Document Viewer

**Components:**
- **Viewer Header** (title, type badge, download button)
- **File Render Area** (PDF/image viewer)
- **Metadata Side Panel**
  - Key/value list of the document's metadata fields
  - Chain-of-custody list (for evidence): handler, action, timestamp, location

### 2.14 Dockets — Case Docket Timeline

**Components:**
- **Page Header** (case context + "Add entry" button)
- **Filter Bar**
  - Activity type filter (Case Filed, Hearing Scheduled, Status Changed, etc.)
  - Search by description
  - Sort toggle (newest first)
- **Timeline / Activity Feed**
  - Entry node (icon + activity type)
  - Description text
  - Performed by (name)
  - Timestamp
- **Pagination / "load more"**

### 2.15 Dockets — Add Docket Entry (modal)

**Components:**
- **Entry Form**
  - Activity type dropdown
  - Description textarea
  - Auto-filled performer & timestamp (read-only)
  - Confirm / Cancel

### 2.16 Participants — List & Search

**Components:**
- **Page Header** ("Add participant" button)
- **Search Bar** (by name)
- **Participants Table**
  - Name
  - Party type (Individual / Group)
  - Contact info summary
  - Row actions (View profile, Associate to case)
- **Pagination**

### 2.17 Participants — Add / Edit Participant

**Components:**
- **Participant Form Card**
  - Name field
  - Party type dropdown
  - Contact info fields (group/repeatable)
  - Profile picture upload
- **Action Bar**

### 2.18 Participants — Participant Profile

**Components:**
- **Profile Header** (avatar, name, party type)
- **Contact Info Panel**
- **Involved Cases List**
  - Case number
  - Role in case
  - Representation (lawyer name or "self-represented")
  - Status pill

### 2.19 Lawyers & Judges — List & Search

**Components:**
- **Tab Toggle** (Lawyers | Judges)
- **Search Bar** (by name)
- **Records Table**
  - Name
  - Bar number
  - Firm (lawyers) / active flag (judges)
  - Row actions (View, Edit)
- **"Add lawyer / Add judge" button**

### 2.20 Lawyers & Judges — Profile

**Components:**
- **Profile Header** (avatar, name, bar number, active badge)
- **Details Panel** (contact, license/bar number, firm)
- **Assigned Cases List**
  - Case number / title
  - Role (counsel / presiding judge)
  - Status pill
- **Edit button**

### 2.21 Dispositions — Create Disposition

**Components:**
- **Disposition Form Card**
  - Linked case (read-only context)
  - Judge selector
  - Outcome type dropdown (Guilty, Dismissed, Settled, Liable, Not Liable)
  - Ruling details textarea
  - Effective date picker
  - Link-to-document selector
- **Auto-action notice** ("This will close the case")
- **Action Bar**

### 2.22 Dispositions — Outcome Manager

**Components:**
- **Outcome List Panel**
  - Outcome name list
  - "Add outcome type" inline form

### 2.23 Dispositions — File Appeal

**Components:**
- **Appeal Form Card**
  - Original case (read-only)
  - Grounds-for-appeal field
  - Appellate court level
  - Document attachment
- **Notice** ("Reopens as a new linked case")
- **Action Bar**

### 2.24 Greffiers — Greffier Directory

**Components:**
- **Search Bar** (by name)
- **Greffiers Table**
  - Name
  - Role (Greffier / Chief Greffier)
  - ID
  - Assigned cases count
  - Row action (View profile)

### 2.25 Greffiers — Greffier Profile

**Components:**
- **Profile Header** (avatar, name, role badge, ID)
- **Contact Panel**
- **Assigned Cases List**
- **Supervision Panel** (who supervises / who they supervise)

### 2.26 Greffiers — Case Assignment *(Chief Greffier only)*

**Components:**
- **Assignment Panel**
  - Unassigned/assignable cases list
  - Subordinate greffier selector
  - "Assign" button
- **Current Assignments Table**
  - Case number
  - Assigned greffier
  - Assigned by
  - Assigned date
  - Reassign / remove action

### 2.27 Greffiers — Supervision Management *(Chief Greffier only)*

**Components:**
- **Supervision Form**
  - Chief Greffier selector
  - Subordinate greffier selector
  - "Assign supervision" button
- **Supervision Table**
  - Chief Greffier
  - Subordinate
  - Edit action (reassign management pool)

---

## 3. ADMIN PANEL — `admin.domain.com`

Authenticated. Used by **Admin**. Focused on user accounts and Role-Based Access Control.

### 3.1 Login

**Components:**
- **Login Card** (same structure as Court Panel login)

### 3.2 Dashboard

**Components:**
- **Top Nav Bar** (logo, user menu, logout)
- **Side Navigation** (Users, Roles, Permissions)
- **Summary Stat Cards**
  - Total users
  - Active users
  - Roles defined
- **Recent User Activity List**

### 3.3 Users — List & Search

**Components:**
- **Page Header** ("Create user" button)
- **Search Bar** (by username)
- **Users Data Table**
  - Username
  - Email
  - Role badge(s)
  - Active/inactive status toggle
  - Created date
  - Row actions (View, Edit, Toggle status)
- **Pagination**

### 3.4 Users — Create User

**Components:**
- **User Form Card**
  - Username field
  - Email field
  - Password field (+ confirm, show/hide)
  - Profile picture upload
  - Role assignment selector (Admin / Chief Greffier / Greffier)
  - Active toggle
- **Action Bar** (Create / Cancel)

### 3.5 Users — User Profile / Edit

**Components:**
- **Profile Header** (avatar, username, role badge, status pill)
- **Account Details Panel** (email, created date)
- **Edit Form** (editable identity fields)
- **Role Assignment Panel** (assigned roles + add/remove)
- **Status Toggle control** (Active / Inactive with confirmation modal)

### 3.6 Roles — Role List

**Components:**
- **Page Header** ("Create role" button)
- **Roles Table**
  - Role name
  - Assigned users count
  - Permission count
  - Row actions (Edit, View permissions)

### 3.7 Roles — Create / Edit Role

**Components:**
- **Role Form Card**
  - Role name field
  - Description field
- **Permissions Matrix**
  - Resource rows (e.g. cases, hearings, documents, users)
  - Action columns (create, read, update, delete)
  - Checkbox per resource × action cell
  - Select-all / clear controls
- **Action Bar** (Save / Cancel)

### 3.8 Permissions — Permission Catalog

**Components:**
- **Permissions Table**
  - Resource
  - Action
  - Description
  - "Add permission" inline control
- **Search / Filter Bar**

---

## 4. Notes for the Figma Build

- **Build the shared library (Section 0) first**, then assemble screens from it. Status pills, tables, modals, and form fields are reused dozens of times.
- **Court Panel is the largest service** — most of your effort sits in the case detail tabs (2.5) and the dynamic document upload form (2.12), since document metadata changes shape per type.
- **Chief Greffier vs Greffier** is a permission difference, not a separate panel. Use the same screens and hide assignment/supervision screens (2.26, 2.27) for plain Greffiers.
- **Public Portal must visually signal "read-only / public."** No edit, create, or status controls anywhere — only view and search.
- **Lawyers and judges never log in** — they exist only as records inside the Court Panel, so they get no panel of their own.
