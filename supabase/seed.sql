-- RxConnect development seed data
-- Public patient workflow rows use created_by = null so they are visible to both
-- the patient portal and authenticated staff under the shared demo policies.

insert into public.providers (id, created_by, name, clinic_name, phone, npi)
values
  ('31111111-1111-1111-1111-111111111111', null, 'Dr. Anita Patel', 'Pacific Rheumatology Clinic', '(555) 431-1180', '1234567890'),
  ('32222222-2222-2222-2222-222222222222', null, 'Dr. Michael Ng', 'Bay Area Pulmonary Partners', '(555) 772-1940', '2234567890'),
  ('33333333-2222-2222-2222-222222222222', null, 'Dr. Rhea Singh', 'Desert Immunology Center', '(555) 660-8122', '3234567890'),
  ('34444444-2222-2222-2222-222222222222', null, 'Dr. Steven Morales', 'Lone Star Neurology', '(555) 902-4411', '4234567890'),
  ('35555555-2222-2222-2222-222222222222', null, 'Dr. Lauren Chen', 'Northwest Dermatology Group', '(555) 144-6208', '5234567890')
on conflict (id) do nothing;

insert into public.insurance (id, created_by, provider_name, member_id, group_number)
values
  ('41111111-1111-1111-1111-111111111111', null, 'Blue Shield of California PPO', 'BS12345098', 'GRP90210'),
  ('42222222-2222-2222-2222-222222222222', null, 'Aetna Signature Administrators', 'AET0098211', 'GRP11872'),
  ('43333333-3333-3333-3333-333333333333', null, 'Cigna Open Access Plus', 'CIG7721093', 'GRP55019'),
  ('44444444-4444-4444-4444-444444444444', null, 'UnitedHealthcare Choice Plus', 'UHC4409821', 'GRP88014'),
  ('45555555-5555-5555-5555-555555555555', null, 'Humana National POS', 'HUM6509912', 'GRP30117')
on conflict (id) do nothing;

insert into public.patients (
  id,
  created_by,
  name,
  first_name,
  last_name,
  date_of_birth,
  phone,
  email,
  address,
  insurance_provider,
  member_id,
  group_number,
  provider_name,
  clinic_name,
  provider_npi,
  provider_phone,
  hipaa_consent,
  enrollment_confirmed,
  status
)
values
  ('11111111-1111-1111-1111-111111111111', null, 'Maria Lopez', 'Maria', 'Lopez', '1982-04-12', '(555) 210-4412', 'maria.lopez@example.com', '1450 Sunset Blvd, Los Angeles, CA 90026', 'Blue Shield of California PPO', 'BS12345098', 'GRP90210', 'Dr. Anita Patel', 'Pacific Rheumatology Clinic', '1234567890', '(555) 431-1180', true, true, 'Enrollment Submitted'),
  ('22222222-2222-2222-2222-222222222222', null, 'David Kim', 'David', 'Kim', '1975-09-28', '(555) 992-1840', 'david.kim@example.com', '810 Market St, San Francisco, CA 94103', 'Aetna Signature Administrators', 'AET0098211', 'GRP11872', 'Dr. Michael Ng', 'Bay Area Pulmonary Partners', '2234567890', '(555) 772-1940', true, true, 'Insurance Verification'),
  ('33333333-3333-3333-3333-333333333333', null, 'Alicia Brown', 'Alicia', 'Brown', '1991-02-06', '(555) 341-8822', 'alicia.brown@example.com', '27 Park Ave, Phoenix, AZ 85004', 'Cigna Open Access Plus', 'CIG7721093', 'GRP55019', 'Dr. Rhea Singh', 'Desert Immunology Center', '3234567890', '(555) 660-8122', true, true, 'Prior Authorization Pending'),
  ('44444444-4444-4444-4444-444444444444', null, 'John Carter', 'John', 'Carter', '1968-11-19', '(555) 778-6201', 'john.carter@example.com', '66 River Rd, Dallas, TX 75201', 'UnitedHealthcare Choice Plus', 'UHC4409821', 'GRP88014', 'Dr. Steven Morales', 'Lone Star Neurology', '4234567890', '(555) 902-4411', true, true, 'Approved'),
  ('55555555-5555-5555-5555-555555555555', null, 'Sophia Patel', 'Sophia', 'Patel', '1987-07-03', '(555) 117-3058', 'sophia.patel@example.com', '390 Lincoln Ave, Seattle, WA 98101', 'Humana National POS', 'HUM6509912', 'GRP30117', 'Dr. Lauren Chen', 'Northwest Dermatology Group', '5234567890', '(555) 144-6208', true, true, 'Ready for Delivery')
on conflict (id) do nothing;

insert into public.prescriptions (
  id,
  created_by,
  patient_id,
  medication_name,
  diagnosis,
  icd10_code,
  dose,
  provider_name,
  status
)
values
  ('66666666-6666-6666-6666-666666666666', null, '11111111-1111-1111-1111-111111111111', 'Skyrizi 150 mg', 'Plaque psoriasis', 'L40.0', '150 mg subcutaneous at week 0, 4, then every 12 weeks', 'Dr. Anita Patel', 'pending_review'),
  ('77777777-7777-7777-7777-777777777777', null, '22222222-2222-2222-2222-222222222222', 'Dupixent 300 mg', 'Severe asthma', 'J45.50', '300 mg every 2 weeks', 'Dr. Michael Ng', 'benefits_verification'),
  ('88888888-8888-8888-8888-888888888888', null, '33333333-3333-3333-3333-333333333333', 'Humira 40 mg', 'Rheumatoid arthritis', 'M06.9', '40 mg every other week', 'Dr. Rhea Singh', 'approved'),
  ('99999999-9999-9999-9999-999999999999', null, '44444444-4444-4444-4444-444444444444', 'Enbrel SureClick 50 mg', 'Multiple sclerosis', 'G35', '50 mg weekly', 'Dr. Steven Morales', 'approved'),
  ('10101010-1010-1010-1010-101010101010', null, '55555555-5555-5555-5555-555555555555', 'Skyrizi 150 mg', 'Crohn disease', 'K50.90', '600 mg IV induction followed by 360 mg on-body injector', 'Dr. Lauren Chen', 'approved')
on conflict (id) do nothing;

insert into public.prior_authorizations (
  id,
  created_by,
  prescription_id,
  payer,
  status,
  submitted_at,
  approved_at
)
values
  ('12121212-1212-1212-1212-121212121212', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '66666666-6666-6666-6666-666666666666', 'Blue Shield of California', 'submitted', '2026-03-12T09:15:00Z', null),
  ('13131313-1313-1313-1313-131313131313', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '77777777-7777-7777-7777-777777777777', 'Aetna', 'pending_docs', '2026-03-11T14:20:00Z', null),
  ('14141414-1414-1414-1414-141414141414', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '88888888-8888-8888-8888-888888888888', 'Cigna', 'approved', '2026-03-10T08:45:00Z', '2026-03-13T16:30:00Z'),
  ('15151515-1515-1515-1515-151515151515', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '99999999-9999-9999-9999-999999999999', 'UnitedHealthcare', 'submitted', '2026-03-13T11:05:00Z', null),
  ('16161616-1616-1616-1616-161616161616', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '10101010-1010-1010-1010-101010101010', 'Humana', 'pending_docs', '2026-03-12T15:40:00Z', null)
on conflict (id) do nothing;

insert into public.tasks (id, created_by, patient_id, title, status, assigned_to, due_date)
values
  ('17171717-1717-1717-1717-171717171717', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Follow up with payer on Maria Lopez Skyrizi case', 'open', 'Alex Romero', '2026-03-14'),
  ('18181818-1818-1818-1818-181818181818', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'Request missing documents for David Kim Dupixent authorization', 'pending', 'Jordan Lee', '2026-03-15'),
  ('19191919-1919-1919-1919-191919191919', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Schedule patient consultation for Alicia Brown', 'in_progress', 'Sam Brooks', '2026-03-16'),
  ('20202020-2020-2020-2020-202020202020', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'Confirm benefits for John Carter Enbrel start', 'open', 'Nina Gomez', '2026-03-16'),
  ('21212121-2121-2121-2121-212121212121', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '55555555-5555-5555-5555-555555555555', 'Upload prior treatment history for Sophia Patel appeal', 'pending', 'Chris Hall', '2026-03-17'),
  ('22212121-2121-2121-2121-212121212121', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Verify copay assistance eligibility for Alicia Brown', 'open', 'Taylor Smith', '2026-03-18'),
  ('23212121-2121-2121-2121-212121212121', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'Call provider office to confirm chart notes for David Kim', 'completed', 'Morgan Diaz', '2026-03-13'),
  ('24212121-2121-2121-2121-212121212121', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Review submitted prior authorization attachments for Maria Lopez', 'in_progress', 'Jamie Cole', '2026-03-14')
on conflict (id) do nothing;

insert into public.messages (id, created_by, patient_id, sender_role, content)
values
  ('51111111-1111-1111-1111-111111111111', null, '11111111-1111-1111-1111-111111111111', 'staff', 'Your enrollment has been received and is waiting for pharmacy review.'),
  ('52222222-2222-2222-2222-222222222222', null, '22222222-2222-2222-2222-222222222222', 'staff', 'Insurance verification is underway. We will update you once benefits are confirmed.'),
  ('53333333-3333-3333-3333-333333333333', null, '33333333-3333-3333-3333-333333333333', 'staff', 'Your prior authorization has been submitted and is pending payer review.'),
  ('54444444-4444-4444-4444-444444444444', null, '44444444-4444-4444-4444-444444444444', 'staff', 'Your treatment has been approved. Our team is preparing next steps.'),
  ('55555555-6666-6666-6666-666666666666', null, '55555555-5555-5555-5555-555555555555', 'staff', 'Your medication is ready for delivery coordination.')
on conflict (id) do nothing;

insert into public.documents (id, created_by, patient_id, file_url)
values
  ('25252525-2525-2525-2525-252525252525', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'https://demo.rxconnect.app/documents/maria-lopez/intake-form.pdf'),
  ('26262626-2626-2626-2626-262626262626', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'https://demo.rxconnect.app/documents/david-kim/chart-notes.pdf'),
  ('27272727-2727-2727-2727-272727272727', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'https://demo.rxconnect.app/documents/alicia-brown/benefits-investigation.pdf'),
  ('28282828-2828-2828-2828-282828282828', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'https://demo.rxconnect.app/documents/john-carter/provider-order.pdf'),
  ('29292929-2929-2929-2929-292929292929', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '55555555-5555-5555-5555-555555555555', 'https://demo.rxconnect.app/documents/sophia-patel/prior-treatment-history.pdf')
on conflict (id) do nothing;
