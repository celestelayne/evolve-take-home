import { useId, useState } from 'react';
import { formatMoney } from '../../../lib/money';
import { formatDate } from '../../../lib/dates';

export type NightlyRateAdjustment = {
  name: string;
  percent: number;
  amount: number;
};

export type NightlyRatesRow = {
  date: string;
  baseRate: number;
  bookedRate: number;
  adjustments: NightlyRateAdjustment[];
};

export type NightlyRatesPromotion = {
  name: string;
  description: string;
  appliesToLabel: string;
  nights: Array<{
    date: string;
    percent: number;
    baseRate: number;
    amount: number;
  }>;
  totalReduction: number;
};

type Props = {
  rows: NightlyRatesRow[];
  summaryLine: string;
  promotions: NightlyRatesPromotion[];
};

function PromotionDetail({ promo }: { promo: NightlyRatesPromotion }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <p className="text-sm">
          <span className="font-medium text-slate-900">{promo.name}</span>
          <span className="text-slate-600"> · {promo.description}</span>
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="ml-1 rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-100"
        >
          {expanded ? 'Hide detail' : 'See detail'}
        </button>
      </div>
      <p className="mt-1 text-sm text-slate-600">{promo.appliesToLabel}</p>

      {expanded && (
        <div className="mt-3 space-y-2 text-sm">
          <table className="min-w-full tabular-nums">
            <tbody>
              {promo.nights.map((night) => (
                <tr key={night.date}>
                  <td className="py-1 text-slate-700">
                    {formatDate(night.date)} · {Math.abs(night.percent)}% × {formatMoney(night.baseRate)}
                  </td>
                  <td className="py-1 text-right text-slate-700">
                    {formatMoney(night.amount)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border-t border-slate-200 py-1 font-medium text-slate-900">
                  Total reduction
                </td>
                <td className="border-t border-slate-200 py-1 text-right font-medium text-slate-900">
                  {formatMoney(promo.totalReduction)}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-500">
            This booking record shows each night&apos;s listed rate and any
            adjustment applied at booking. It does not include how the listed
            rates themselves were set.
          </p>
        </div>
      )}
    </div>
  );
}

export function NightlyRates({ rows, summaryLine, promotions }: Props) {
  const headingId = useId();

  const baseSubtotal = rows.reduce((s, r) => s + r.baseRate, 0);
  const adjustmentSubtotal = rows
    .flatMap((r) => r.adjustments)
    .reduce((s, a) => s + a.amount, 0);
  const total = rows.reduce((s, r) => s + r.bookedRate, 0);

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500"
      >
        Accommodation details
      </h2>

      <details className="group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
          <span>{summaryLine}</span>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180"
          >
            <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>

        <div className="border-t border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-4 py-2 text-left font-medium">
                  Night
                </th>
                <th scope="col" className="px-4 py-2 text-right font-medium">
                  Base
                </th>
                <th scope="col" className="px-4 py-2 text-left font-medium">
                  Adjustments
                </th>
                <th scope="col" className="px-4 py-2 text-right font-medium">
                  Booked
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row) => (
                <tr key={row.date}>
                  <td className="px-4 py-2 text-slate-700">{formatDate(row.date)}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-slate-500">
                    {formatMoney(row.baseRate)}
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    {row.adjustments.length === 0 ? (
                      <span aria-label="No adjustments" className="text-slate-400">
                        —
                      </span>
                    ) : (
                      <ul className="space-y-0.5 tabular-nums">
                        {row.adjustments.map((adj, i) => (
                          <li key={`${row.date}-${i}`}>
                            {adj.name} {adj.percent}% · {formatMoney(adj.amount)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums font-medium text-slate-900">
                    {formatMoney(row.bookedRate)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50">
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">
                  Accommodation total
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                  {formatMoney(baseSubtotal)}
                </td>
                <td className="px-4 py-3 text-left tabular-nums text-slate-700">
                  {adjustmentSubtotal !== 0 && (
                    <span>{formatMoney(adjustmentSubtotal)}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-900">
                  {formatMoney(total)}
                </td>
              </tr>
            </tfoot>
          </table>

          {promotions.length > 0 && (
            <div className="space-y-4 border-t border-slate-200 px-4 py-4">
              {promotions.map((promo, i) => (
                <PromotionDetail key={i} promo={promo} />
              ))}
            </div>
          )}
        </div>
      </details>
    </section>
  );
}
