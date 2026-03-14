"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type FormActionButtonProps = {
  idleText: string;
  pendingText: string;
  variant?: "primary" | "secondary" | "ghost" | "subtle";
};

export function FormActionButton({
  idleText,
  pendingText,
  variant = "primary",
}: FormActionButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button loading={pending} type="submit" variant={variant}>
      {pending ? pendingText : idleText}
    </Button>
  );
}
