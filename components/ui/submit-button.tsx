"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  idleText: string;
  pendingText: string;
};

export function SubmitButton({
  idleText,
  pendingText,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full rounded-2xl py-3.5 text-sm font-semibold shadow-[0_16px_30px_rgba(15,118,110,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
      loading={pending}
      type="submit"
      variant="secondary"
    >
      {pending ? pendingText : idleText}
    </Button>
  );
}
