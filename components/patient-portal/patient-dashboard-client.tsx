"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PatientDashboardView } from "@/components/patient-portal/patient-dashboard-view";
import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { createClient } from "@/lib/supabase/client";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;

  return document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`))
    ?.split("=")[1] ?? null;
}

type PatientData = {
  patient: {
    first_name: string | null;
    last_name: string | null;
    status: string;
  } | null;
  prescriptions: Array<{
    id: string;
    medication_name: string;
    diagnosis: string | null;
    dose: string | null;
    status: string;
  }>;
  messages: Array<{
    id: string;
    sender_role: string;
    content: string;
    created_at: string;
  }>;
};

export function PatientDashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PatientData>({
    patient: null,
    prescriptions: [],
    messages: [],
  });

  useEffect(() => {
    const patientId = getCookie("rxconnect-patient-session");

    if (!patientId) {
      router.replace("/patient/login");
      return;
    }

    const supabase = createClient();
    let isMounted = true;

    async function loadDashboard(showLoading = false) {
      if (showLoading && isMounted) {
        setLoading(true);
      }

      const [{ data: patient, error: patientError }, { data: prescriptions, error: prescriptionsError }, { data: messages, error: messagesError }] =
        await Promise.all([
          supabase.from("patients").select("first_name, last_name, status").eq("id", patientId).maybeSingle(),
          supabase
            .from("prescriptions")
            .select("id, medication_name, diagnosis, dose, status, created_at")
            .eq("patient_id", patientId)
            .order("created_at", { ascending: false }),
          supabase
            .from("messages")
            .select("id, sender_role, content, created_at")
            .eq("patient_id", patientId)
            .order("created_at", { ascending: false }),
        ]);

      if (!isMounted) {
        return;
      }

      if (patientError || prescriptionsError || messagesError || !patient) {
        setError(patientError?.message ?? prescriptionsError?.message ?? messagesError?.message ?? "Unable to load patient dashboard.");
        setLoading(false);
        return;
      }

      setError(null);
      setData({
        patient,
        prescriptions: prescriptions ?? [],
        messages: messages ?? [],
      });
      setLoading(false);
    }

    void loadDashboard(true);

    const refreshInterval = window.setInterval(() => {
      void loadDashboard(false);
    }, 15000);

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void loadDashboard(false);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      window.clearInterval(refreshInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <Card className="p-6">
          <LoadingSkeleton className="h-5 w-40" />
          <LoadingSkeleton className="mt-4 h-10 w-2/3" />
          <LoadingSkeleton className="mt-3 h-4 w-1/2" />
        </Card>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_360px]">
          <Card className="p-6">
            <LoadingSkeleton className="h-5 w-36" />
            <LoadingSkeleton className="mt-5 h-24 w-full" />
          </Card>
          <Card className="p-6">
            <LoadingSkeleton className="h-5 w-32" />
            <LoadingSkeleton className="mt-5 h-24 w-full" />
          </Card>
        </div>
      </div>
    );
  }

  if (error || !data.patient) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-semibold text-ink dark:text-[#f8fafc]">Patient dashboard unavailable</h1>
          <p className="mt-3 text-sm text-slate dark:text-[#cbd5e1]">{error ?? "Please sign in again."}</p>
        </Card>
      </div>
    );
  }

  return (
    <PatientDashboardView
      messages={data.messages}
      patient={data.patient}
      prescriptions={data.prescriptions}
    />
  );
}
