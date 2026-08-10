import { BookingOrientation } from './features/booking-detail/components/BookingOrientation';
import { PayoutSummary } from './features/booking-detail/components/PayoutSummary';
import { Reconciliation } from './features/booking-detail/components/Reconciliation';
import { NightlyRates } from './features/booking-detail/components/NightlyRates';
import { BookingReference } from './features/booking-detail/components/BookingReference';
import { getHeroDetail } from './features/booking-detail/booking-detail.utils';

function App() {
  const detail = getHeroDetail();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex flex-col gap-8">
        <BookingOrientation {...detail.orientation} />
        <PayoutSummary {...detail.payout} />
        <Reconciliation {...detail.reconciliation} />
        <NightlyRates {...detail.nightlyRates} />
        <BookingReference {...detail.reference} />
      </div>
    </main>
  );
}

export default App;
