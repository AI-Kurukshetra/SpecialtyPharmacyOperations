# Database Design

## Core Tables

### patients

Stores patient demographic and insurance data.

Fields:

* id
* name
* date_of_birth
* insurance_provider
* created_at

---

### prescriptions

Represents medication prescriptions.

Fields:

* id
* patient_id
* medication_name
* provider_name
* status
* created_at

---

### prior_authorizations

Tracks prior authorization requests.

Fields:

* id
* prescription_id
* payer
* status
* submitted_at
* approved_at

---

### tasks

Operational tasks for pharmacy staff.

Fields:

* id
* title
* status
* assigned_to
* due_date

---

### documents

Stores uploaded documents.

Fields:

* id
* patient_id
* file_url
* created_at
