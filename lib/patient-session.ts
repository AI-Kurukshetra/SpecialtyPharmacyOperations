import { cookies } from "next/headers";

const PATIENT_SESSION_COOKIE = "rxconnect-patient-session";

export async function getPatientSessionId() {
  const cookieStore = await cookies();
  return cookieStore.get(PATIENT_SESSION_COOKIE)?.value ?? null;
}

export async function setPatientSessionId(patientId: string) {
  const cookieStore = await cookies();

  cookieStore.set(PATIENT_SESSION_COOKIE, patientId, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearPatientSessionId() {
  const cookieStore = await cookies();
  cookieStore.delete(PATIENT_SESSION_COOKIE);
}
