import { useId } from 'react';
import { formatDate } from '../../../lib/dates';

type Props = {
  bookingId: string;
  dateBooked: string;
  bookingSite?: string | null;
  guest?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null;
};

export function BookingReference({ bookingId, dateBooked, bookingSite, guest }: Props) {
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
          <dt className="text-xs text-slate-500">Booked</dt>
          <dd className="mt-0.5 text-slate-900">{formatDate(dateBooked)}</dd>
        </div>
        {bookingSite && (
          <div>
            <dt className="text-xs text-slate-500">Source</dt>
            <dd className="mt-0.5 text-slate-900">{bookingSite}</dd>
          </div>
        )}
        {guest?.name && (
          <div>
            <dt className="text-xs text-slate-500">Guest</dt>
            <dd className="mt-0.5 text-slate-900">{guest.name}</dd>
          </div>
        )}
        {guest?.email && (
          <div>
            <dt className="text-xs text-slate-500">Email</dt>
            <dd className="mt-0.5 text-slate-900">
              <a className="hover:underline" href={`mailto:${guest.email}`}>
                {guest.email}
              </a>
            </dd>
          </div>
        )}
        {guest?.phone && (
          <div>
            <dt className="text-xs text-slate-500">Phone</dt>
            <dd className="mt-0.5 text-slate-900">
              <a
                className="hover:underline"
                href={`tel:${guest.phone.replace(/\s+/g, '')}`}
              >
                {guest.phone}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
}
