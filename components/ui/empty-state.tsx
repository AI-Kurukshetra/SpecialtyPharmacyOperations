import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Card className="p-8 text-center sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-brandDark dark:bg-white/[0.15] dark:text-accent" aria-hidden="true">
        <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
          <path
            d="M6 7.5C6 6.67157 6.67157 6 7.5 6H16.5C17.3284 6 18 6.67157 18 7.5V16.5C18 17.3284 17.3284 18 16.5 18H7.5C6.67157 18 6 17.3284 6 16.5V7.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M9 12H15M12 9V15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
        </svg>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ink dark:text-[#f1f5f9]">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm text-slate dark:text-[#cbd5e1]">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-5" onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}
