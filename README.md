# Evolve Payout Detail Prototype

| Overview | Detail |
| :---        | :---        |
| Live Prototype | [evolve-take-home.vercel.app](https://evolve-take-home.vercel.app/) |
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
| Phase         | Human | AI    | Output|
| :------------ | :---  | :---  | :---  |
| 1. Understand | Read brief/data, identify core job, choose primary scenario | Audit brief + JSON in parallel for contradictions, gaps, assumptions, edge cases | Problem framing + assumptions/constraints 
| 2. Prioritize | Rank goals and establish hierarchy | Challenge IA + progressive disclosure | Goals + IA + visibility rules 
| 3. Explore | Evaluate alternatives and choose/synthesize | Generate approaches + scaffold 3–4 rough variants | Chosen product direction 
| 4. Build | Direct implementation, inspect, adjust | Generate React/TS structure, components, states, data augmentation | Working deployed prototype
| 5. Validate + Package | Smoke-test tasks, accessibility, responsive behavior; record decisions | Code review, edge-state audit, README/video-outline assistance | Repo + README + video walkthrough 

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
├── components/ <!-- Shared components go here -->
├── data/
│   └── payouts-dataset.json
├── features/
│   └── booking-detail/
│       ├── components/ <!-- Feature components go here -->
│       ├── booking-detail.types.ts
│       ├── booking-detail.utils.ts
│       └── BookingDetail.tsx
├── lib/ <!-- Shared helpers go here -->
├── App.tsx
└── index.css
```

## What I'd Explore Next