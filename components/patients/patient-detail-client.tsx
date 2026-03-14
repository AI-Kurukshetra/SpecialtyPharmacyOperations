"use client";

import { useEffect, useState } from "react";

import { PatientDetailView } from "@/components/patients/patient-detail-view";
import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { createClient } from "@/lib/supabase/client";

type PatientDetailClientProps = {
  patientId: string;
  message?: string;
  messageType?: "success" | "error";
};

export function PatientDetailClient({
  patientId,
  message,
  messageType,
}: PatientDetailClientProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    patient: any;
    prescriptions: any[];
    messages: any[];
    tasks: any[];
  }>({
    patient: null,
    prescriptions: [],
    messages: [],
    tasks: [],
  });

  useEffect(() => {
    const supabase = createClient();

    async function loadPatient() {
      const [
        { data: patient, error: patientError },
        { data: prescriptions, error: prescriptionsError },
        { data: messages, error: messagesError },
        { data: tasks, error: tasksError },
      ] = await Promise.all([
        supabase.from("patients").select("*").eq("id", patientId).maybeSingle(),
        supabase
          .from("prescriptions")
          .select("id, medication_name, diagnosis, icd10_code, dose, provider_name, status, created_at")
          .eq("patient_id", patientId)
          .order("created_at", { ascending: false }),
        supabase
          .from("messages")
          .select("id, sender_role, content, created_at")
          .eq("patient_id", patientId)
          .order("created_at", { ascending: false }),
        supabase
          .from("tasks")
          .select("id, title, assigned_to, due_date, status, created_at")
          .eq("patient_id", patientId)
          .order("created_at", { ascending: false }),
      ]);

      if (patientError || prescriptionsError || messagesError || tasksError || !patient) {
        setError(patientError?.message ?? prescriptionsError?.message ?? messagesError?.message ?? tasksError?.message ?? "Unable to load patient.");
        setLoading(false);
        return;
      }

      setData({
        patient,
        prescriptions: prescriptions ?? [],
        messages: messages ?? [],
        tasks: tasks ?? [],
      });
      setLoading(false);
    }

    void loadPatient();
  }, [patientId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <LoadingSkeleton className="h-5 w-40" />
          <LoadingSkeleton className="mt-4 h-10 w-1/2" />
          <LoadingSkeleton className="mt-3 h-4 w-2/3" />
        </Card>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
          <Card className="p-6">
            <LoadingSkeleton className="h-5 w-36" />
            <LoadingSkeleton className="mt-5 h-40 w-full" />
          </Card>
          <Card className="p-6">
            <LoadingSkeleton className="h-5 w-28" />
            <LoadingSkeleton className="mt-5 h-40 w-full" />
          </Card>
        </div>
      </div>
    );
  }

  if (error || !data.patient) {
    return (
      <Card className="p-8 text-center">
        <h1 className="text-2xl font-semibold text-ink dark:text-[#f8fafc]">Patient record unavailable</h1>
        <p className="mt-3 text-sm text-slate dark:text-[#cbd5e1]">{error ?? "The requested patient could not be found."}</p>
      </Card>
    );
  }

  return (
    <PatientDetailView
      message={message}
      messageType={messageType}
      messages={data.messages}
      patient={data.patient}
      prescriptions={data.prescriptions}
      tasks={data.tasks}
    />
  );
}
