import { BookingOrientation } from '../features/booking-detail/components/BookingOrientation';
import { PayoutSummary } from '../features/booking-detail/components/PayoutSummary';
import { BookingReference } from '../features/booking-detail/components/BookingReference';
import { getHeroDetail } from '../features/booking-detail/booking-detail.utils';

function Guided() {
  const detail = getHeroDetail();

  return (
    <>
      <BookingOrientation {...detail.orientation} />
      <PayoutSummary {...detail.payout} />
      <BookingReference {...detail.reference} />
    </>
  );
}

export default Guided;
