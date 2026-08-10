import { BookingOrientation } from '../features/booking-detail/components/BookingOrientation';
import { getHeroDetail } from '../features/booking-detail/booking-detail.utils';

function Flow() {
  const detail = getHeroDetail();

  return <BookingOrientation {...detail.orientation} />;
}

export default Flow;
