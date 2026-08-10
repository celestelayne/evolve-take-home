import { useId } from 'react';
import { StatusBadge, type Status } from './StatusBadge';
import { formatMoney } from '../../../lib/money';
import { formatDate } from '../../../lib/dates';

type Props = {
  status: Status;
  amount: number | null;
  managementFee?: number | null;
  expectedDepositDate?: string | null;
  depositedDate?: string | null;
  bankAccount?: { institution: string; lastFour: string };
  emptyMessage?: string;
};

export function PayoutSummary({
  status,
  amount,
  managementFee,
  expectedDepositDate,
  depositedDate,
  bankAccount,
  emptyMessage = 'No payout for these dates.',
}: Props) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-lg border border-slate-200 bg-white p-5"
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2
          id={headingId}
          className="text-xs font-medium uppercase tracking-wide text-slate-500"
        >
          Payout summary
        </h2>
        <StatusBadge status={status} />
      </header>

      {amount === null ? (
        <p className="text-sm text-slate-600">{emptyMessage}</p>
      ) : (
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-slate-500">Net payout</dt>
            <dd className="mt-1 text-3xl font-semibold tabular-nums text-slate-900">
              {formatMoney(amount)}
            </dd>
          </div>

          <div className="space-y-2 text-sm">
            {depositedDate ? (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Deposited</dt>
                <dd className="tabular-nums text-slate-900">{formatDate(depositedDate)}</dd>
              </div>
            ) : expectedDepositDate ? (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Expected</dt>
                <dd className="tabular-nums text-slate-900">{formatDate(expectedDepositDate)}</dd>
              </div>
            ) : null}

            {managementFee != null && (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Management fee</dt>
                <dd className="tabular-nums text-slate-900">−{formatMoney(managementFee)}</dd>
              </div>
            )}

            {bankAccount && (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Deposits to</dt>
                <dd className="text-slate-900">
                  <span>{bankAccount.institution}</span>{' '}
                  <span className="tabular-nums text-slate-500">
                    ····{bankAccount.lastFour}
                  </span>
                </dd>
              </div>
            )}
          </div>
        </dl>
      )}
    </section>
  );
}
