import dataset from '../../data/payouts-dataset.json';
import { formatDate } from '../../lib/dates';
import type { Booking, LineItem } from './booking-detail.types';
import type { Status } from './components/StatusBadge';
import type { ReconciliationRow } from './components/Reconciliation';
import type { NightlyRatesRow } from './components/NightlyRates';

type Listing = typeof dataset.listing;
type Owner = typeof dataset.owner;

const sumByType = (booking: Booking, type: LineItem['type']): number =>
  booking.lineItems
    .filter((item) => item.type === type)
    .reduce((sum, item) => sum + item.amount, 0);

export const getBaseTotal = (booking: Booking) => sumByType(booking, 'base');
export const getCleaningFee = (booking: Booking) => sumByType(booking, 'fee');
export const getTaxTotal = (booking: Booking) => sumByType(booking, 'tax');
export const getGuestTotal = (booking: Booking): number =>
  getBaseTotal(booking) + getCleaningFee(booking) + getTaxTotal(booking);
export const getTaxLineItems = (booking: Booking): LineItem[] =>
  booking.lineItems.filter((item) => item.type === 'tax');

export const getDisplayStatus = (booking: Booking): Status =>
  booking.status === 'blocked'
    ? 'blocked'
    : (booking.payout?.status ?? 'pending');

const getStatusDetail = (booking: Booking): string => {
  const parts: string[] = [];
  if (booking.status === 'checked_in') parts.push('Currently checked in');
  else if (booking.status === 'checked_out') parts.push('Guest checked out');
  else if (booking.status === 'booked') parts.push('Upcoming stay');
  else if (booking.status === 'canceled') parts.push('Reservation canceled');
  else if (booking.status === 'blocked') parts.push('Blocked by owner');

  if (booking.payout?.depositedDate) {
    parts.push(`Deposited ${formatDate(booking.payout.depositedDate)}`);
  } else if (
    booking.payout?.status === 'pending' ||
    booking.payout?.status === 'scheduled'
  ) {
    parts.push(`Deposit expected ${formatDate(booking.payout.expectedDepositDate)}`);
  }
  return parts.join(' · ');
};

const getHeadline = (booking: Booking): string =>
  booking.guest?.name ?? 'Owner-blocked dates';

const getSupporting = (listing: Listing): string =>
  `${listing.name} · ${listing.city}, ${listing.state}`;

const getStayLabel = (booking: Booking): string =>
  `${formatDate(booking.stay.checkIn)} – ${formatDate(booking.stay.checkOut)} · ${booking.stay.nights} nights`;

const getGuestMeta = (booking: Booking): string => {
  const parts: string[] = [];
  const { adults, children, infants } = booking.stay;
  if (adults) parts.push(`${adults} adult${adults === 1 ? '' : 's'}`);
  if (children) parts.push(`${children} ${children === 1 ? 'child' : 'children'}`);
  if (infants) parts.push(`${infants} infant${infants === 1 ? '' : 's'}`);
  return [booking.bookingSite, parts.join(', ')].filter(Boolean).join(' · ');
};

const getReconciliationRows = (
  booking: Booking,
  listing: Listing,
): ReconciliationRow[] => {
  const managementFee = booking.payout?.managementFee ?? 0;
  const netPayout = booking.payout?.amount ?? 0;
  const feeRatePct = Math.round(listing.managementFeeRate * 100);
  return [
    {
      label: 'Guest paid',
      amount: getGuestTotal(booking),
      emphasis: 'total',
      detail: 'Base rate, cleaning fee, and taxes',
    },
    {
      label: 'Taxes remitted',
      amount: -getTaxTotal(booking),
      detail: 'Collected from guest, sent to tax authorities',
    },
    {
      label: 'Management fee',
      amount: -managementFee,
      detail: `${feeRatePct}% of base rate`,
    },
    { label: 'Net payout', amount: netPayout, emphasis: 'total' },
  ];
};

const getNightlyRatesRows = (booking: Booking): NightlyRatesRow[] =>
  (booking.nightlyRates ?? []).map((night) => ({
    date: night.date,
    baseRate: night.baseRate,
    bookedRate: night.bookedRate,
    adjustments: night.adjustments.map((adj) => ({
      name: adj.name,
      amount: adj.amount,
    })),
  }));

const getBookingOrientationProps = (booking: Booking, listing: Listing) => ({
  status: getDisplayStatus(booking),
  statusDetail: getStatusDetail(booking),
  headline: getHeadline(booking),
  supporting: getSupporting(listing),
  stayLabel: getStayLabel(booking),
  meta: getGuestMeta(booking),
});

const getPayoutSummaryProps = (booking: Booking, owner: Owner) => ({
  status: getDisplayStatus(booking),
  amount: booking.payout?.amount ?? null,
  managementFee: booking.payout?.managementFee ?? null,
  expectedDepositDate: booking.payout?.expectedDepositDate ?? null,
  depositedDate: booking.payout?.depositedDate ?? null,
  bankAccount: owner.bankAccount,
});

const getReconciliationProps = (booking: Booking, listing: Listing) => ({
  rows: getReconciliationRows(booking, listing),
});

const getNightlyRatesProps = (booking: Booking) => ({
  rows: getNightlyRatesRows(booking),
});

const getBookingReferenceProps = (booking: Booking) => ({
  bookingId: booking.id,
  dateBooked: booking.dateBooked,
  bookingSite: booking.bookingSite,
  guest: booking.guest
    ? {
        name: booking.guest.name,
        email: booking.guest.email,
        phone: booking.guest.phone,
      }
    : null,
});

const HERO_BOOKING_ID = '15932931';

export const getHeroDetail = () => {
  const booking = dataset.bookings.find((b) => b.id === HERO_BOOKING_ID) as Booking;
  const { listing, owner } = dataset;
  return {
    orientation: getBookingOrientationProps(booking, listing),
    payout: getPayoutSummaryProps(booking, owner),
    reconciliation: getReconciliationProps(booking, listing),
    nightlyRates: getNightlyRatesProps(booking),
    reference: getBookingReferenceProps(booking),
  };
};
