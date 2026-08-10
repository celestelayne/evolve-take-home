import { useId } from 'react';
import { StatusBadge, type Status } from './StatusBadge';
import { formatMoney } from '../../../lib/money';
import { formatFullDate } from '../../../lib/dates';

type Props = {
  status: Status;
  amount: number | null;
  expectedDepositDate?: string | null;
  depositedDate?: string | null;
  bankAccount?: { institution: string; lastFour: string };
  emptyMessage?: string;
};

export function PayoutSummary({
  status,
  amount,
  expectedDepositDate,
  depositedDate,
  bankAccount,
  emptyMessage = 'No payout for these dates.',
}: Props) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        {amount === null ? (
          <p className="text-sm text-slate-600">{emptyMessage}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Owner payout
              </p>
              <p className="mt-2 text-4xl font-semibold tabular-nums text-slate-900 sm:text-5xl">
                {formatMoney(amount)}
              </p>
            </div>

            <dl className="divide-y divide-slate-200 text-sm">
              <div className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
                <dt className="text-slate-500">Booking Status</dt>
                <dd>
                  <StatusBadge status={status} />
                </dd>
              </div>

              {depositedDate ? (
                <div className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
                  <dt className="text-slate-500">Deposited</dt>
                  <dd className="tabular-nums text-slate-900">
                    {formatFullDate(depositedDate)}
                  </dd>
                </div>
              ) : expectedDepositDate ? (
                <div className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
                  <dt className="text-slate-500">Expected deposit</dt>
                  <dd className="tabular-nums text-slate-900">
                    {formatFullDate(expectedDepositDate)}
                  </dd>
                </div>
              ) : null}

              {bankAccount && (
                <div className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
                  <dt className="text-slate-500">Deposits to</dt>
                  <dd className="text-slate-900">
                    <span>{bankAccount.institution}</span>{' '}
                    <span className="tabular-nums text-slate-500">
                      ····{bankAccount.lastFour}
                    </span>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
