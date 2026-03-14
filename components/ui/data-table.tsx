import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type DataTableProps = {
  columns: string[];
  rows: string[][];
  emptyTitle?: string;
  emptyDescription?: string;
};

function toneForValue(value: string) {
  const normalized = value.toLowerCase();

  if (
    normalized.includes("approved") ||
    normalized.includes("active") ||
    normalized.includes("open")
  ) {
    return "success" as const;
  }

  if (
    normalized.includes("pending") ||
    normalized.includes("review") ||
    normalized.includes("docs")
  ) {
    return "warning" as const;
  }

  if (
    normalized.includes("submitted") ||
    normalized.includes("progress") ||
    normalized.includes("verification")
  ) {
    return "info" as const;
  }

  return "default" as const;
}

export function DataTable({
  columns,
  rows,
  emptyTitle = "No records yet",
  emptyDescription = "Records created in this section will appear here.",
}: DataTableProps) {
  if (rows.length === 0) {
    return (
      <Card className="p-8">
        <h3 className="text-lg font-semibold text-ink dark:text-[#f1f5f9]">{emptyTitle}</h3>
        <p className="mt-2 max-w-xl text-sm text-slate dark:text-[#cbd5e1]">{emptyDescription}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-3 sm:hidden">
        {rows.map((row, index) => (
          <Card className="p-4" key={`${row[0]}-${index}`} tone="muted">
            <div className="space-y-3">
              {row.map((cell, cellIndex) => (
                <div className="flex items-start justify-between gap-4" key={`${cell}-${cellIndex}`}>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">
                    {columns[cellIndex]}
                  </span>
                  <div className="text-right text-sm text-ink dark:text-[#f1f5f9]">
                    {cellIndex === row.length - 1 ? (
                      <Badge tone={toneForValue(cell)}>{cell}</Badge>
                    ) : (
                      cell
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Card className="hidden overflow-hidden sm:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/80">
              <tr>
                {columns.map((column) => (
                  <th
                    className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate dark:text-[#94a3b8]"
                    key={column}
                    scope="col"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-white/[0.12]">
              {rows.map((row, index) => (
                <tr
                  className="bg-white/70 transition-colors hover:bg-slate-50 dark:bg-slate-800/50 dark:hover:bg-slate-700/60"
                  key={`${row[0]}-${index}`}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      className="whitespace-nowrap px-5 py-4 text-sm text-ink dark:text-[#f1f5f9]"
                      key={`${cell}-${cellIndex}`}
                    >
                      {cellIndex === row.length - 1 ? (
                        <Badge tone={toneForValue(cell)}>{cell}</Badge>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
