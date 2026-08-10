import type {
  Booking,
  LineItem,
} from './booking-detail.types';

export const getBaseTotal = (booking: Booking) =>
  booking.lineItems
    .filter((item) => item.type === 'base')
    .reduce((sum, item) => sum + item.amount, 0);

export const getCleaningFee = (booking: Booking) =>
  booking.lineItems
    .filter((item) => item.type === 'fee')
    .reduce((sum, item) => sum + item.amount, 0);

export const getTaxTotal = (booking: Booking) =>
  booking.lineItems
    .filter((item) => item.type === 'tax')
    .reduce((sum, item) => sum + item.amount, 0);

export const getGuestTotal = (booking: Booking): number =>
  getBaseTotal(booking) + getCleaningFee(booking) + getTaxTotal(booking);

export const getTaxLineItems = (booking: Booking): LineItem[] =>
  booking.lineItems.filter((li) => li.type === 'tax');
