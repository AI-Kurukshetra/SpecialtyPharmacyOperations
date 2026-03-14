"use client";

import { startTransition, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { ModalDialog } from "@/components/ui/modal-dialog";
import { Toast } from "@/components/ui/toast";

type ResourcePlaceholderProps = {
  title: string;
  description: string;
  buttonLabel: string;
  columns: string[];
  rows: string[][];
};

export function ResourcePlaceholder({
  title,
  description,
  buttonLabel,
  columns,
  rows,
}: ResourcePlaceholderProps) {
  const [records, setRecords] = useState(rows);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftMeta, setDraftMeta] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return records;
    }

    return records.filter((row) =>
      row.some((cell) => cell.toLowerCase().includes(normalized)),
    );
  }, [query, records]);

  const singularTitle = title.endsWith("s") ? title.slice(0, -1) : title;

  function buildDraftRow() {
    const baseLabel = draftName.trim() || `New ${singularTitle}`;
    const secondValue = draftMeta.trim() || "Pending Review";

    if (columns.length === 4) {
      return [baseLabel, secondValue, "RxConnect Team", "Open"];
    }

    return Array.from({ length: columns.length }, (_, index) => {
      if (index === 0) return baseLabel;
      if (index === 1) return secondValue;
      if (index === columns.length - 1) return "Open";
      return "Pending";
    });
  }

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
              Workspace
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink dark:text-[#f1f5f9]">{title}</h2>
            <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              aria-label={`Search ${title.toLowerCase()}`}
              className="min-w-[240px] xl:w-[280px]"
              placeholder={`Search ${title.toLowerCase()}`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button onClick={() => setModalOpen(true)} variant="secondary">
              {buttonLabel}
            </Button>
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
          <div className="space-y-4">
            {filteredRows.length === 0 ? (
              <EmptyState
                actionLabel={buttonLabel}
                description={
                  query
                    ? `No ${title.toLowerCase()} matched "${query}". Try a broader search or create a new ${singularTitle.toLowerCase()}.`
                    : `Create your first ${singularTitle.toLowerCase()} to populate this workspace and start tracking activity here.`
                }
                onAction={() => setModalOpen(true)}
                title={query ? `No matching ${title.toLowerCase()}` : `No ${title.toLowerCase()} yet`}
              />
            ) : (
              <DataTable columns={columns} rows={filteredRows} />
            )}

            <Card className="p-5 sm:p-6" tone="muted">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink dark:text-[#f1f5f9]">
                    Team guidance
                  </p>
                  <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
                    Use this workspace to stage new records, review queue health, and keep the team aligned while Supabase-backed workflows are added.
                  </p>
                </div>
                <Button onClick={() => setModalOpen(true)} variant="ghost">
                  Quick add
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5" tone="muted">
              <p className="text-sm font-semibold text-ink dark:text-[#f1f5f9]">Section summary</p>
              <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
                This shared layout keeps each section useful even before full data integrations are connected.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div>
                  <p className="text-2xl font-semibold text-ink dark:text-[#f1f5f9]">{filteredRows.length}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">
                    Visible Records
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-ink dark:text-[#f1f5f9]">
                    {query ? "Filtered" : "Ready"}
                  </p>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">
                    Interaction State
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5" tone="accent">
              <p className="text-sm font-semibold text-ink dark:text-[#f1f5f9]">Next step</p>
              <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
                Add a new {singularTitle.toLowerCase()} draft to keep the section populated and demonstrate the intended workflow.
              </p>
              <Button className="mt-5 w-full" onClick={() => setModalOpen(true)} variant="secondary">
                {buttonLabel}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <ModalDialog
        description={`This MVP flow is a placeholder for creating a new ${singularTitle.toLowerCase()} record.`}
        onClose={() => setModalOpen(false)}
        onPrimaryAction={() => {
          setIsSaving(true);
          startTransition(() => {
            setRecords((current) => [buildDraftRow(), ...current]);
            setModalOpen(false);
            setShowToast(true);
            setDraftName("");
            setDraftMeta("");
            setIsSaving(false);
          });
        }}
        open={modalOpen}
        primaryActionLoading={isSaving}
        primaryActionLabel="Save draft"
        title={`Create ${singularTitle}`}
      >
        <div className="space-y-3">
          <Input
            onChange={(event) => setDraftName(event.target.value)}
            placeholder={`${singularTitle} name`}
            value={draftName}
          />
          <Input
            onChange={(event) => setDraftMeta(event.target.value)}
            placeholder="Owner or related entity"
            value={draftMeta}
          />
        </div>
      </ModalDialog>

      {showToast ? (
        <div className="fixed bottom-20 right-4 z-40 sm:bottom-4">
          <Toast
            description={`${singularTitle} draft added to the workspace queue.`}
            onClose={() => setShowToast(false)}
            title={`${singularTitle} saved`}
            tone="success"
          />
        </div>
      ) : null}
    </>
  );
}
