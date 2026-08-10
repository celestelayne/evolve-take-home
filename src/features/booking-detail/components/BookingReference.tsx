import { useId } from 'react';
import { formatFullDate } from '../../../lib/dates';

type Props = {
  bookingId: string;
  dateBooked: string;
  bookingSite?: string | null;
  guest?: {
    name?: string | null;
  } | null;
  party?: string | null;
};

export function BookingReference({
  bookingId,
  dateBooked,
  bookingSite,
  guest,
  party,
}: Props) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500"
      >
        Booking reference
      </h2>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-lg border border-slate-200 bg-white p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-slate-500">Confirmation code</dt>
          <dd className="mt-0.5 break-all font-mono text-slate-900">{bookingId}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Date booked</dt>
          <dd className="mt-0.5 text-slate-900">{formatFullDate(dateBooked)}</dd>
        </div>
        {bookingSite && (
          <div>
            <dt className="text-xs text-slate-500">Source</dt>
            <dd className="mt-0.5 text-slate-900">{bookingSite}</dd>
          </div>
        )}
        {guest?.name && (
          <div>
            <dt className="text-xs text-slate-500">Guest details</dt>
            <dd className="mt-0.5 text-slate-900">
              {party && <span className="text-slate-500">{party}</span>}
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
}
