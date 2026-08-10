type Props = {
  headline: string;
  supporting?: string;
  statusLabel?: string;
  stayLabel?: string;
};

export function BookingOrientation({
  headline,
  supporting,
  statusLabel,
  stayLabel,
}: Props) {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {headline}
      </h1>

      {supporting && <p className="text-sm text-slate-600">{supporting}</p>}

      {(statusLabel || stayLabel) && (
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-slate-700">
          {statusLabel && <span>{statusLabel}</span>}
          {statusLabel && stayLabel && (
            <span aria-hidden className="text-slate-400">
              ·
            </span>
          )}
          {stayLabel && <span>{stayLabel}</span>}
        </div>
      )}
    </header>
  );
}
