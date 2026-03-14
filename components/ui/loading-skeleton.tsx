import { cn } from "@/lib/utils";

type LoadingSkeletonProps = {
  className?: string;
};

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-[linear-gradient(90deg,#E7EEF4_0%,#F7FAFC_45%,#E7EEF4_100%)] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite] dark:bg-[#223245]",
        className,
      )}
    />
  );
}
