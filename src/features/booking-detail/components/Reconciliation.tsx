import { useId } from 'react';
import { formatMoney } from '../../../lib/money';

export type ReconciliationRow = {
  label: string;
  amount: number;
  detail?: string;
  emphasis?: 'total' | 'default';
};

type Props = {
  rows: ReconciliationRow[];
};

export function Reconciliation({ rows }: Props) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500"
      >
        Reconciliation
      </h2>
      <dl className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
        {rows.map((row, i) => {
          const isTotal = row.emphasis === 'total';
          return (
            <div
              key={`${i}-${row.label}`}
              className={
                isTotal
                  ? 'flex items-baseline justify-between gap-4 bg-slate-50 px-4 py-3'
                  : 'flex items-baseline justify-between gap-4 px-4 py-3 text-sm'
              }
            >
              <div>
                <dt className={isTotal ? 'font-medium text-slate-900' : 'text-slate-700'}>
                  {row.label}
                </dt>
                {row.detail && <p className="mt-0.5 text-xs text-slate-500">{row.detail}</p>}
              </div>
              <dd
                className={
                  isTotal
                    ? 'tabular-nums font-medium text-slate-900'
                    : row.amount < 0
                      ? 'tabular-nums text-slate-700'
                      : 'tabular-nums text-slate-900'
                }
              >
                {formatMoney(row.amount)}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
