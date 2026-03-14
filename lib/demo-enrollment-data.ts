export type DemoEnrollmentProfile = {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
  email: string;
  address: string;
  insurance_provider: string;
  member_id: string;
  group_number: string;
  provider_name: string;
  clinic_name: string;
  provider_npi: string;
  provider_phone: string;
  medication_name: string;
  diagnosis: string;
  icd10_code: string;
  dose: string;
  hipaa_consent: boolean;
  enrollment_confirmed: boolean;
};

const demoEnrollmentProfiles: DemoEnrollmentProfile[] = [
  {
    id: "maria-lopez",
    first_name: "Maria",
    last_name: "Lopez",
    date_of_birth: "1982-04-12",
    phone: "(555) 210-4412",
    email: "maria.lopez@example.com",
    address: "1450 Sunset Blvd, Los Angeles, CA 90026",
    insurance_provider: "Blue Shield of California PPO",
    member_id: "BS12345098",
    group_number: "GRP90210",
    provider_name: "Dr. Anita Patel",
    clinic_name: "Pacific Rheumatology Clinic",
    provider_npi: "1234567890",
    provider_phone: "(555) 431-1180",
    medication_name: "Skyrizi 150 mg",
    diagnosis: "Plaque psoriasis",
    icd10_code: "L40.0",
    dose: "150 mg at week 0, week 4, then every 12 weeks",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
  {
    id: "david-kim",
    first_name: "David",
    last_name: "Kim",
    date_of_birth: "1975-09-28",
    phone: "(555) 992-1840",
    email: "david.kim@example.com",
    address: "810 Market St, San Francisco, CA 94103",
    insurance_provider: "Aetna Signature Administrators",
    member_id: "AET0098211",
    group_number: "GRP11872",
    provider_name: "Dr. Michael Ng",
    clinic_name: "Bay Area Pulmonary Partners",
    provider_npi: "2234567890",
    provider_phone: "(555) 772-1940",
    medication_name: "Dupixent 300 mg",
    diagnosis: "Severe asthma",
    icd10_code: "J45.50",
    dose: "300 mg every 2 weeks",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
  {
    id: "alicia-brown",
    first_name: "Alicia",
    last_name: "Brown",
    date_of_birth: "1991-02-06",
    phone: "(555) 341-8822",
    email: "alicia.brown@example.com",
    address: "27 Park Ave, Phoenix, AZ 85004",
    insurance_provider: "Cigna Open Access Plus",
    member_id: "CIG7721093",
    group_number: "GRP55019",
    provider_name: "Dr. Rhea Singh",
    clinic_name: "Desert Immunology Center",
    provider_npi: "3234567890",
    provider_phone: "(555) 660-8122",
    medication_name: "Humira 40 mg",
    diagnosis: "Rheumatoid arthritis",
    icd10_code: "M06.9",
    dose: "40 mg every other week",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
  {
    id: "john-carter",
    first_name: "John",
    last_name: "Carter",
    date_of_birth: "1968-11-19",
    phone: "(555) 778-6201",
    email: "john.carter@example.com",
    address: "66 River Rd, Dallas, TX 75201",
    insurance_provider: "UnitedHealthcare Choice Plus",
    member_id: "UHC4409821",
    group_number: "GRP88014",
    provider_name: "Dr. Steven Morales",
    clinic_name: "Lone Star Neurology",
    provider_npi: "4234567890",
    provider_phone: "(555) 902-4411",
    medication_name: "Enbrel SureClick 50 mg",
    diagnosis: "Multiple sclerosis",
    icd10_code: "G35",
    dose: "50 mg weekly",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
  {
    id: "sophia-patel",
    first_name: "Sophia",
    last_name: "Patel",
    date_of_birth: "1987-07-03",
    phone: "(555) 117-3058",
    email: "sophia.patel@example.com",
    address: "390 Lincoln Ave, Seattle, WA 98101",
    insurance_provider: "Humana National POS",
    member_id: "HUM6509912",
    group_number: "GRP30117",
    provider_name: "Dr. Lauren Chen",
    clinic_name: "Northwest Dermatology Group",
    provider_npi: "5234567890",
    provider_phone: "(555) 144-6208",
    medication_name: "Skyrizi 150 mg",
    diagnosis: "Crohn disease",
    icd10_code: "K50.90",
    dose: "600 mg IV induction then 360 mg injector",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
  {
    id: "ethan-mitchell",
    first_name: "Ethan",
    last_name: "Mitchell",
    date_of_birth: "1994-03-22",
    phone: "(555) 408-9154",
    email: "ethan.mitchell@example.com",
    address: "715 Broad St, Nashville, TN 37203",
    insurance_provider: "Anthem Blue Cross PPO",
    member_id: "ANT5500271",
    group_number: "GRP44320",
    provider_name: "Dr. Carla Reyes",
    clinic_name: "Summit GI Specialists",
    provider_npi: "6234567890",
    provider_phone: "(555) 380-7714",
    medication_name: "Stelara 90 mg",
    diagnosis: "Ulcerative colitis",
    icd10_code: "K51.90",
    dose: "90 mg every 8 weeks",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
  {
    id: "olivia-bennett",
    first_name: "Olivia",
    last_name: "Bennett",
    date_of_birth: "1979-01-15",
    phone: "(555) 628-3044",
    email: "olivia.bennett@example.com",
    address: "204 Pearl St, Denver, CO 80203",
    insurance_provider: "Kaiser Permanente Gold",
    member_id: "KAI7611134",
    group_number: "GRP22018",
    provider_name: "Dr. Neil Sharma",
    clinic_name: "Rocky Mountain Rheumatology",
    provider_npi: "7234567890",
    provider_phone: "(555) 528-1630",
    medication_name: "Orencia ClickJect 125 mg",
    diagnosis: "Psoriatic arthritis",
    icd10_code: "L40.50",
    dose: "125 mg weekly",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
  {
    id: "noah-rivera",
    first_name: "Noah",
    last_name: "Rivera",
    date_of_birth: "1988-06-30",
    phone: "(555) 739-1266",
    email: "noah.rivera@example.com",
    address: "55 Biscayne Blvd, Miami, FL 33132",
    insurance_provider: "Florida Blue Choice",
    member_id: "FLB8839012",
    group_number: "GRP55280",
    provider_name: "Dr. Evelyn Brooks",
    clinic_name: "South Coast Allergy and Asthma",
    provider_npi: "8234567890",
    provider_phone: "(555) 222-9086",
    medication_name: "Xolair 150 mg",
    diagnosis: "Chronic idiopathic urticaria",
    icd10_code: "L50.1",
    dose: "300 mg every 4 weeks",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
  {
    id: "grace-adams",
    first_name: "Grace",
    last_name: "Adams",
    date_of_birth: "1990-10-08",
    phone: "(555) 816-4721",
    email: "grace.adams@example.com",
    address: "980 Peachtree St, Atlanta, GA 30309",
    insurance_provider: "Caresource Marketplace",
    member_id: "CSR4491820",
    group_number: "GRP11809",
    provider_name: "Dr. Henry Vaughn",
    clinic_name: "Atlanta Multiple Sclerosis Center",
    provider_npi: "9234567890",
    provider_phone: "(555) 713-6610",
    medication_name: "Kesimpta 20 mg",
    diagnosis: "Relapsing-remitting multiple sclerosis",
    icd10_code: "G35",
    dose: "20 mg monthly after loading doses",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
  {
    id: "liam-foster",
    first_name: "Liam",
    last_name: "Foster",
    date_of_birth: "1984-12-11",
    phone: "(555) 554-0189",
    email: "liam.foster@example.com",
    address: "418 Michigan Ave, Chicago, IL 60611",
    insurance_provider: "BCBS Illinois PPO",
    member_id: "BCI3304419",
    group_number: "GRP99143",
    provider_name: "Dr. Monica Hayes",
    clinic_name: "Midwest Gastroenterology Associates",
    provider_npi: "1034567890",
    provider_phone: "(555) 930-4472",
    medication_name: "Entyvio 300 mg",
    diagnosis: "Crohn disease",
    icd10_code: "K50.90",
    dose: "300 mg at week 0, 2, 6, then every 8 weeks",
    hipaa_consent: true,
    enrollment_confirmed: true,
  },
];

export function getRandomDemoEnrollment(previousId?: string): DemoEnrollmentProfile {
  const candidates =
    demoEnrollmentProfiles.length > 1
      ? demoEnrollmentProfiles.filter((profile) => profile.id !== previousId)
      : demoEnrollmentProfiles;

  const randomIndex = Math.floor(Math.random() * candidates.length);

  return candidates[randomIndex];
}

export function fillDemoEnrollmentForm(
  form: HTMLFormElement,
  profile: DemoEnrollmentProfile,
) {
  Object.entries(profile).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);

    if (field instanceof HTMLInputElement) {
      if (field.type === "checkbox") {
        field.checked = Boolean(value);
      } else {
        field.value = String(value);
      }
    }

    if (field instanceof HTMLTextAreaElement) {
      field.value = String(value);
    }
  });
}
