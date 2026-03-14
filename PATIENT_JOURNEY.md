# Maria Lopez — Patient-to-Staff Workflow

## 1. Patient Enrollment (public portal)
Enter the following details on `/enroll` to simulate a new patient journey:

| Field | Value |
| --- | --- |
| First name | Maria |
| Last name | Lopez |
| Date of birth | 1982-04-12 |
| Phone | (555) 210-4412 |
| Email | maria.lopez@example.com |
| Address | 1450 Sunset Blvd, Los Angeles, CA 90026 |
| Insurance provider | Blue Shield of California PPO |
| Member ID | BS12345098 |
| Group number | GRP90210 |
| Prescribing doctor | Dr. Anita Patel |
| Clinic name | Pacific Rheumatology Clinic |
| Provider phone | (555) 431-1180 |
| Medication name | Skyrizi 150 mg |
| Diagnosis | Plaque psoriasis |
| ICD10 code | L40.0 |
| Consent | Check HIPAA + enrollment confirmation |

After submitting, you should land on `/patient/dashboard` with the status `Enrollment Submitted` and the timeline showing this first step.

## 2. Staff Processing (staff portal)
1. Visit `/portal/login`, authenticate using a staff Test account, and go to `/portal/dashboard`.
2. Maria appears under “New Patient Enrollments.” Open her patient record to review demographics, insurance, and medication information.
3. Update her workflow status to **Insurance Verification**; the patient message feed automatically adds a note explaining the verification.
4. Create a prescription entry for Skyrizi (if it was not generated yet) and submit a prior authorization from the patient detail view. The status becomes `Prior Authorization Pending` and a new staff message is created.
5. Once the prior authorization is approved, set status to **Approved** or **Ready for Delivery**; the timeline updates accordingly and the patient receives the final notification message.

## 3. Patient Portal Verification
1. On `/patient/login`, sign in with `maria.lopez@example.com` and `1982-04-12`.
2. The dashboard timeline should now list:
   * Enrollment Submitted
   * Insurance Verification
   * Prior Authorization Pending
   * Approved (or Ready for Delivery, depending on staff actions)
3. Confirm the “Messages” section shows staff updates, and the “Current Prescription” card lists Skyrizi along with its status.

## 4. Optional Follow-Up Tasks
- Record a staff task such as “Follow up with payer” or “Upload missing docs” to demonstrate task visibility in `/portal/dashboard` and `/tasks`.
- After entering the task, Maria’s patient timeline remains in sync, and the task list on her staff dashboard reflects the new assignment.

## 5. Ending the Flow
- Use `/portal/dashboard` to finalize the workflow (e.g., mark prior authorization approved, set medication ready, and assign final tasks).
- Log the patient out from `/patient/dashboard` and test the staff logout at `/portal/dashboard` if needed.

This single-story patient journey lets you verify enrollment, status updates, prescription and prior authorization handling, task creation, and cross-role dashboard behavior end to end.
