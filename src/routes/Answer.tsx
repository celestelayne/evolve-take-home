import { BookingOrientation } from '../features/booking-detail/components/BookingOrientation';
import { PayoutSummary } from '../features/booking-detail/components/PayoutSummary';
import { Reconciliation } from '../features/booking-detail/components/Reconciliation';
import { NightlyRates } from '../features/booking-detail/components/NightlyRates';
import { BookingReference } from '../features/booking-detail/components/BookingReference';
import { getHeroDetail } from '../features/booking-detail/booking-detail.utils';

function Answer() {
  const detail = getHeroDetail();

  return (
    <>
      <BookingOrientation {...detail.orientation} />

      <PayoutSummary {...detail.payout} />

      <Reconciliation {...detail.reconciliation} />

      <NightlyRates {...detail.nightlyRates} />

      <BookingReference {...detail.reference} />
    </>
  );
}

export default Answer;
