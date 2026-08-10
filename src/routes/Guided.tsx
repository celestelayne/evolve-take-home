import { BookingOrientation } from '../features/booking-detail/components/BookingOrientation';
import { getHeroDetail } from '../features/booking-detail/booking-detail.utils';

function Guided() {
  const detail = getHeroDetail();

  return <BookingOrientation {...detail.orientation} />;
}

export default Guided;
