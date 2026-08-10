import { useId } from 'react';
import { formatMoney } from '../../../lib/money';
import { formatDate } from '../../../lib/dates';

export type NightlyRateAdjustment = {
  name: string;
  amount: number;
};

export type NightlyRatesRow = {
  date: string;
  baseRate: number;
  bookedRate: number;
  adjustments: NightlyRateAdjustment[];
};

type Props = {
  rows: NightlyRatesRow[];
};

export function NightlyRates({ rows }: Props) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500"
      >
        Nightly rates
      </h2>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-2 text-left font-medium">
                Night
              </th>
              <th scope="col" className="px-4 py-2 text-right font-medium">
                Listed
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
                    <ul className="space-y-0.5">
                      {row.adjustments.map((adj, i) => (
                        <li
                          key={`${row.date}-${i}`}
                          className="flex items-baseline justify-between gap-4"
                        >
                          <span>{adj.name}</span>
                          <span className="tabular-nums">{formatMoney(adj.amount)}</span>
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
        </table>
      </div>
    </section>
  );
}
