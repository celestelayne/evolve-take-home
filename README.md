# Evolve Payout Detail Prototype

| Key | Value |
| :---        | :---        |
| Live Prototype | [URL]() |
| Stack | React + TypeScript + Vite + Tailwind, deployed to Vercel |
| Scenario | Jordan Avery viewing an in-flight booking for South Congress Loft. |

## Key Decisions

<!-- Add decisions as they are made during the design process. -->

## Dataset Assumptions

#### Provided data:
```typescript
{
  "description": "Rate for 6 Nights",
  "amount": 732.14,
  "type": "base"
}
```
The provided dataset includes an aggregate base rate for each stay, but does not include individual nightly rates or merchandising/discount details. Because the exercise asks owners to understand what rates were booked and why, I extended the selected booking with synthetic `nightlyRates` and `merchandising` data to support that experience. **Note:** These additions are just examples. The original booking and payout numbers haven't changed, and the nightly rates still add up to the original total.

#### Proposed data:
```typescript
    {
      "nightlyRates": [
        {
            "date": "2026-05-16",
            "listedRate": 165.00,
            "adjustments": [
                {
                    "type": "promotion",
                    "name": "Spring promotion",
                    "amount": -16.50
                }
            ],
            "bookedRate": 148.50
        },
        ...
      ],
      "merchandising": [
        {
            "id": "promo_spring_10",
            "type": "promotion",
            "name": "Spring promotion",
            "description": "10% off select nights",
            "appliesTo": [
                "2026-05-16",
                "2026-05-17"
            ]
        }
      ],
    },
```
The full augmented booking is available in `src/data/payouts-dataset.json`.

## AI Workflow

<!-- Add after completing the workflow. -->

## Running Locally
```bash
npm install
npm run dev
```

## Project Structure
This prototype uses a feature-oriented structure, keeping booking-detail UI and
business logic together while shared components and utilities remain reusable.

```markdown
src/
├── components/
├── data/
│   └── payouts-dataset.json
├── features/
│   └── booking-detail/
│       ├── components/
│       ├── booking-detail.types.ts
│       ├── booking-detail.utils.ts
│       └── BookingDetail.tsx
├── lib/
├── App.tsx
└── index.css
```

## What I'd Explore Next