# RxConnect Feature Testing Guide

This guide is for developers validating the current MVP implementation in the repository.

Important current-state note:
- Supabase authentication is implemented and enforced for protected routes.
- The dashboard and module pages are implemented as polished placeholder UIs.
- Patients, prescriptions, prior authorizations, and tasks are not yet persisted from the UI to Supabase.
- The section pages support local demo interactions such as search, quick-create modal flows, toasts, and loading feedback.

## Prerequisites

1. Add valid values to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Install dependencies:
   - `npm install`
3. Run the app:
   - `npm run dev`
4. Open `http://localhost:3000`

## Implemented Features

- Authentication
- Protected dashboard shell
- Dashboard overview
- Patients module
- Prescriptions module
- Prior authorizations module
- Tasks module
- Theme switching
- Loading skeletons and navigation loading states
- Empty states, modal dialogs, toast feedback, and mobile navigation

## Authentication

### What it does

Provides Supabase email/password sign up, sign in, sign out, protected route redirects, and success or error feedback messages.

### How to access it

- Visit `/login`
- Visit `/signup`
- Try visiting `/dashboard` while signed out

### How to test it

1. Open `/dashboard` in a signed-out browser session.
2. Confirm you are redirected to `/login` with a `next` parameter.
3. On `/signup`, create a test account with an email and password of at least 6 characters.
4. Confirm you either:
   - land on `/dashboard`, or
   - get redirected to `/login` with a success message instructing email confirmation, depending on Supabase auth settings.
5. On `/login`, submit invalid credentials.
6. Confirm an error message appears in the form.
7. Submit valid credentials.
8. Confirm you land on `/dashboard` and see the workspace UI.
9. Use the sign-out action from the top-right user card.
10. Confirm you are redirected back to `/login` with a success message.

### Expected behavior

- Signed-out users cannot access `/dashboard`, `/patients`, `/prescriptions`, `/prior-authorizations`, or `/tasks`.
- Signed-in users visiting `/login` or `/signup` are redirected to `/dashboard`.
- The submit button shows a loading state while auth is processing.
- Auth success and error messages are readable and accessible.

## Dashboard

### What it does

Provides the main pharmacy operations view with stat cards, an active case table, quick actions, modal demo flow, toast feedback, responsive navigation, and a full-width workspace wrapper.

### How to access it

- Sign in and open `/dashboard`
- Root `/` also redirects here

### How to test it

1. Sign in and load `/dashboard`.
2. Confirm the sidebar is visible on desktop.
3. Confirm the top navigation is sticky while scrolling.
4. Verify the main content fills the available width and sits inside a rounded surface wrapper.
5. Verify stat cards render in a responsive grid.
6. Use the `New intake` button.
7. Confirm a modal opens with placeholder form fields.
8. Click the primary action in the modal.
9. Confirm the modal closes and a success toast appears.
10. Use `Show notification` and confirm a toast appears.

### Expected behavior

- The page feels populated even with limited data.
- Modal and toast interactions work without a full page refresh.
- Desktop, tablet, and mobile layouts remain usable.
- Current dashboard data is static placeholder data and does not persist to Supabase.

## Patients Module

### What it does

Shows a patient workspace with header, search, responsive table, summary cards, empty-state logic, and a modal to add a local draft record.

### How to access it

- Open `/patients`
- Or use the sidebar and mobile navigation

### How to test it

1. Open `/patients`.
2. Confirm the page header, search field, action button, table, and right-side summary panels render.
3. Search for `Maria` and confirm the list filters down.
4. Search for a term with no match, such as `ZZZ`.
5. Confirm a friendly empty state appears with a CTA.
6. Clear the search.
7. Click `New Patient`.
8. Enter a draft name and related value in the modal.
9. Save the draft.
10. Confirm a new row appears at the top of the table and a success toast is shown.

### Expected behavior

- Search filters records client-side.
- Empty states replace the table when no rows match.
- New records added from the modal are local UI drafts only and reset on refresh.

## Prescriptions Module

### What it does

Provides a prescription workspace using the shared module layout with responsive table, search, modal draft flow, and summary panels.

### How to access it

- Open `/prescriptions`

### How to test it

1. Open `/prescriptions`.
2. Confirm prescription rows and statuses appear.
3. Search for `Dupixent`.
4. Confirm the table filters correctly.
5. Search for a missing term and verify the empty state.
6. Click `New Prescription`.
7. Save a draft record.
8. Confirm the draft appears immediately in the table.

### Expected behavior

- Status badges render with clear visual distinction.
- Desktop uses a table layout; mobile uses stacked cards.
- Draft creation updates the current page state only.

## Prior Authorizations Module

### What it does

Displays prior authorization placeholder records with payer, submission timing, status badges, search, and quick draft creation.

### How to access it

- Open `/prior-authorizations`

### How to test it

1. Open `/prior-authorizations`.
2. Confirm records show payer and status information.
3. Search for `Aetna` and verify filtering.
4. Search for a missing value and verify the empty-state CTA.
5. Create a new authorization draft from the modal.
6. Confirm the new draft appears at the top of the section.

### Expected behavior

- Status badges for submitted, pending docs, and approved are readable in both themes.
- Empty states and toasts are consistent with other modules.
- This page is not yet connected to live Supabase CRUD from the UI.

## Tasks Module

### What it does

Shows operational tasks with owner, due date, status, search, modal draft creation, and shared layout behavior.

### How to access it

- Open `/tasks`

### How to test it

1. Open `/tasks`.
2. Confirm the task table renders.
3. Search for an owner or status keyword.
4. Confirm matching rows remain visible.
5. Use `New Task` to create a draft task.
6. Confirm the new task appears at the top of the list.

### Expected behavior

- The task list is responsive on mobile and desktop.
- Draft task creation is local-only.
- There is no implemented UI action yet for marking a task complete from persisted data.

## Theme Switching

### What it does

Supports Light, Dark, and System theme modes using `next-themes`-style local theme state with persistence in local storage.

### How to access it

- Use the `Theme` dropdown in the top navigation on desktop
- Use the mobile sidebar on smaller screens

### How to test it

1. Open any protected page such as `/dashboard`.
2. Open the `Theme` dropdown.
3. Select `Dark`.
4. Confirm the workspace, cards, tables, sidebar, inputs, and modals all adapt cleanly.
5. Select `Light` and verify the same components return to the light palette.
6. Select `System`.
7. Change the OS/browser color preference if convenient and reload.
8. Confirm the UI follows the system theme.
9. Refresh the page and confirm the selected preference persists.

### Expected behavior

- No major theme flash on initial load.
- The selected theme remains after navigation and refresh.
- The theme switcher is available in both desktop and mobile navigation flows.

## Loading Skeletons And Navigation Feedback

### What it does

Adds loading placeholders for route transitions, app-level loading states, and async button actions.

### How to access it

- Navigate between protected pages
- Submit auth forms
- Trigger modal save actions

### How to test it

1. Click between `/dashboard`, `/patients`, `/prescriptions`, `/prior-authorizations`, and `/tasks`.
2. Confirm the content area swaps to an in-flow skeleton instead of overlaying the previous page.
3. Confirm the sidebar and top navigation remain stable while content is loading.
4. Submit the login or signup form and confirm the CTA shows a loading state.
5. Open a quick-create modal and submit it.
6. Confirm the modal primary action shows loading briefly before success feedback appears.

### Expected behavior

- Skeletons replace the content area instead of blurring the existing page.
- Navigation feels immediate and structured.
- Buttons show pending feedback during actions.

## Running Seed Data In Supabase

### Option 1: Supabase SQL Editor

1. Open your Supabase project dashboard.
2. Go to `SQL Editor`.
3. Create a new query.
4. Paste the contents of [supabase/seed.sql](/home/bacancy/Krunal/Hackathon/rxconnect/supabase/seed.sql).
5. Click `Run`.

### Option 2: Use the repository file directly

1. Open [supabase/seed.sql](/home/bacancy/Krunal/Hackathon/rxconnect/supabase/seed.sql).
2. Copy the SQL into the Supabase SQL Editor.
3. Run the script.

### Expected behavior

- Inserts succeed without duplication because the script uses `on conflict (id) do nothing`.
- You will get:
  - 5 patients
  - 5 prescriptions
  - 5 prior authorizations
  - 8 tasks
  - 5 documents

Important:
- If you keep the demo `created_by` UUID, seeded rows may not be visible to a signed-in user because of RLS.
- For app-visible data under the current policies, replace `aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa` with a real `auth.users.id` from your Supabase project before running the seed.

## Seed Validation Queries

Run these in the Supabase SQL Editor after seeding:

```sql
select count(*) from public.patients;
select count(*) from public.prescriptions;
select count(*) from public.prior_authorizations;
select count(*) from public.tasks;
```

Optional relational checks:

```sql
select p.name, rx.medication_name, rx.status
from public.prescriptions rx
join public.patients p on p.id = rx.patient_id
order by p.name;

select rx.medication_name, pa.payer, pa.status
from public.prior_authorizations pa
join public.prescriptions rx on rx.id = pa.prescription_id
order by pa.submitted_at desc nulls last;
```

## Sample Workflows

### Workflow 1: Auth And Workspace Access

1. Sign up or sign in.
2. Verify redirect into `/dashboard`.
3. Navigate to patients, prescriptions, prior authorizations, and tasks.
4. Confirm protected routing, theme persistence, and navigation loading states work correctly.

Expected behavior:
- Auth succeeds.
- Protected routes are accessible only after login.
- Navigation between modules is smooth and responsive.

### Workflow 2: Module Draft Flow

1. Open `/patients` and create a local draft patient.
2. Open `/prescriptions` and create a local draft prescription.
3. Open `/prior-authorizations` and create a local draft authorization.
4. Confirm each page shows the new draft immediately.

Expected behavior:
- Each module updates immediately in the current session.
- Toast feedback is shown after save.
- Draft records are not persisted to Supabase yet.

### Workflow 3: Task And UI State Validation

1. Open `/tasks`.
2. Create a new task draft.
3. Search for the draft name.
4. Confirm the filtered result appears.
5. Refresh the page.

Expected behavior:
- The draft appears immediately before refresh.
- After refresh, the task returns to default placeholder data because persistence is not implemented yet.

### Workflow 4: Theme Verification

1. Open the theme selector.
2. Switch between Light, Dark, and System.
3. Navigate across multiple modules after each change.
4. Reopen the app in a new tab or refresh.

Expected behavior:
- The selected theme persists.
- Cards, tables, forms, sidebar, and empty states remain readable in every theme.

## Developer Notes

- Use the seed data to validate schema relationships and Supabase tables, not current UI data binding.
- If you want the UI to display Supabase records next, the module pages need real fetch and mutation wiring.
- The fastest smoke test for the current MVP is:
  1. verify auth redirects
  2. verify dashboard renders
  3. verify module search and modal draft flows
  4. verify theme switching
  5. verify navigation skeleton behavior
