import { StatusBadge, type Status } from './StatusBadge';

type Props = {
  status: Status;
  statusDetail?: string;
  headline: string;
  supporting?: string;
  stayLabel?: string;
  meta?: string;
};

export function BookingOrientation({
  status,
  statusDetail,
  headline,
  supporting,
  stayLabel,
  meta,
}: Props) {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <StatusBadge status={status} />
        {statusDetail && <p className="text-sm text-slate-600">{statusDetail}</p>}
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {headline}
        </h1>
        {supporting && <p className="mt-1 text-sm text-slate-600">{supporting}</p>}
      </div>

      {(stayLabel || meta) && (
        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {stayLabel && (
            <div>
              <dt className="sr-only">Stay</dt>
              <dd className="text-slate-900">{stayLabel}</dd>
            </div>
          )}
          {meta && (
            <div>
              <dt className="sr-only">Details</dt>
              <dd className="text-slate-600">{meta}</dd>
            </div>
          )}
        </dl>
      )}
    </header>
  );
}
