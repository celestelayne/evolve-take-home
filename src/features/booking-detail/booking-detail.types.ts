export type ReservationStatus =
  | 'blocked'
  | 'booked'
  | 'checked_in'
  | 'checked_out'
  | 'canceled';

export type PayoutStatus = 'paid' | 'pending' | 'scheduled' | 'canceled';

export type LineItem = {
  description: string;
  amount: number;
  type: 'base' | 'fee' | 'tax';
};

export type Adjustment = {
  type: string;
  name: string;
  percent: number;
  amount: number;
};

export type NightlyRate = {
  date: string;
  baseRate: number;
  adjustments: Adjustment[];
  bookedRate: number;
};

export type Merchandising = {
  id: string;
  type: string;
  name: string;
  description: string;
  appliesTo: string[];
};

export type Payout = {
  amount: number;
  managementFee: number;
  status: PayoutStatus;
  expectedDepositDate: string;
  depositedDate: string | null;
};

export type Booking = {
  id: string;
  status: ReservationStatus;
  bookingSite: string | null;

  guestName: string | null;

  checkIn: string;
  checkOut: string;
  nights: number;

  dateBooked: string;
  lineItems: LineItem[];

  nightlyRates?: NightlyRate[];
  merchandising?: Merchandising[];

  payout: Payout | null;
  returningGuest: boolean;
};
