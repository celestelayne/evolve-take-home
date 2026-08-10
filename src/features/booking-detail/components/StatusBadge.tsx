import type { ReactNode } from 'react';

export type Status = 'paid' | 'pending' | 'scheduled' | 'canceled' | 'blocked';

const DEFAULT_LABELS: Record<Status, string> = {
  paid: 'Paid',
  pending: 'Pending',
  scheduled: 'Scheduled',
  canceled: 'Canceled',
  blocked: 'Blocked',
};

const TONE: Record<Status, string> = {
  paid: 'bg-emerald-50 text-emerald-900 ring-emerald-200',
  pending: 'bg-amber-50 text-amber-900 ring-amber-200',
  scheduled: 'bg-sky-50 text-sky-900 ring-sky-200',
  canceled: 'bg-rose-50 text-rose-900 ring-rose-200',
  blocked: 'bg-slate-100 text-slate-800 ring-slate-300',
};

const ICON: Record<Status, ReactNode> = {
  paid: (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pending: (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  scheduled: (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <rect x="3" y="4.5" width="14" height="12" rx="1.5" />
      <path d="M3 8.5h14M7 3v3M13 3v3" strokeLinecap="round" />
    </svg>
  ),
  canceled: (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" />
    </svg>
  ),
  blocked: (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <circle cx="10" cy="10" r="7" />
      <path d="M5.5 5.5l9 9" strokeLinecap="round" />
    </svg>
  ),
};

type Props = {
  status: Status;
  label?: string;
};

export function StatusBadge({ status, label }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TONE[status]}`}
    >
      {ICON[status]}
      <span>{label ?? DEFAULT_LABELS[status]}</span>
    </span>
  );
}
