# README: Payouts dataset

This dataset is **fictional**. All names, contact info, IDs, the listing, and the owner are synthetic - created for this design exercise only. Any resemblance to real people or properties is coincidental.

## Setup

- **The exercise's "today":** `2026-05-17`. The dataset is shaped so some bookings are in the past, one is in-flight, and several are upcoming relative to this date. Treat `2026-05-17` as the current date inside your prototype.
- **The owner:** Jordan Avery - one listing on Evolve's Plus plan.
- **The listing:** _South Congress Loft_, a 1-bed/1-bath in Austin, TX.

## Structure

The file is a single JSON object:

```
{
    meta: { ... description, today, currency }
    owner: { ... displayName, plan, bank account last4 }
    listing: { ... name, location, management fee rate, cleaning fee }
    taxes: [ ... tax line definitions ]
    bookings: [ ... ~40 entries - see below ]
}
```
## Booking entries

Each entry in `bookings` is either a guest reservation or an owner-blocked night.


| Field | Notes |
| :---        | :---        |
| id             | Booking ID (numeric for direct/Airbnb, alphanumeric for VRBO, etc.) |
| status         | checked_out · checked_in · booked · canceled · blocked |
| bookingSite    | Airbnb, VRBO, Evolve, Expedia, Booking.com, Hopper, or null for owner blocks. "Evolve" means the guest booked direct through the Evolve website. |
| guest          | {name, email, phone} - email/phone may be null (Airbnb hides PII) |
| stay           | {checkIn, checkOut, nights, adults, children, infants, pets} |
| dateBooked     | Date the reservation was made. ISO 8601 (YYYY-MM-DD). |
| lineItems      | Array of {description, amount, type} - types: base, fee, tax |
| payout         | See below. null for owner blocks. |
| returningGuest | true if this guest has stayed at the listing before |

## Payout states

Every reservation (not blocks) has a payout object:

| `payout.status` | What it means|
| :---        | :---        |
| paid              | Deposit has hit the owner's bank account. depositedDate is populated. |
| pending           | Guest has checked in but the deposit hasn't landed yet (typically 5-9 business days from check-in). expectedDepositDate is the estimate. |
| scheduled         | Guest hasn't checked in yet. expectedDepositDate is when the deposit is projected to land if the booking completes. |
| canceled          | Booking was canceled before the stay. amount is \$0. |

`payout.amount` = (base rate + cleaning fee) − management fee. Taxes are collected from the guest and remitted to tax authorities - they do **not** flow to the owner.

## Money model (kept simple on purpose)

- **Base rate** - nightly rate × nights stayed.
- **Cleaning fee** - flat \$140 per booking. Passes through to owner in full.
- **Occupancy taxes** - 6% TX state + 9% Austin city + 2% Travis County, applied to (base + cleaning). Not part of the owner payout.
- **Management fee** - 15% of base rate. Evolve's cut on the Plus plan.
- **Owner payout** - what lands in the owner's account.

## Quick sanity numbers

- ~40 entries spanning Nov 2025 → Sep 2026
- 19 paid · 1 in-flight · 8 upcoming · 1 canceled · 11 owner blocks
- ~\$13.0k paid to date, ~\$6.5k pending or scheduled

## How to use it

Drop `payouts-dataset.json` into your project and import / fetch it. No backend, no auth, no API - just static JSON.

All dates in the dataset are ISO 8601 (YYYY-MM-DD). If something else in the data is missing or ambiguous, make a reasonable call and note it in your video.