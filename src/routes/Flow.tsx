import { BookingOrientation } from '../features/booking-detail/components/BookingOrientation';
import { BookingReference } from '../features/booking-detail/components/BookingReference';
import { getHeroDetail } from '../features/booking-detail/booking-detail.utils';

function Flow() {
  const detail = getHeroDetail();

  return (
    <>
      <BookingOrientation {...detail.orientation} />
      <BookingReference {...detail.reference} />
    </>
  );
}

export default Flow;
