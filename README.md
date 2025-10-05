# Hack Yeah 2025

## Requirements

- Node v22

## Setup instruction

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

## Features implemented

* Random event generator
* Decision-making system
* Character condition system
* Life goals focus system
* Real-time financial calculations
* Job contract management
* Retirement evaluation
* Education tracking
* Items gathered (like car, house, gym membership)
* End of life budget and happiness summary

## Features not yet implemented

* Real-time top bar life progress plot
* Various game modes (challenge, story) - we focused fully on sandbox mode
* After game list of experienced events

What have impacts on event possibilities?

- CharacterCondition (physicalHealth, hapiness)
- Focus (hobby, health, relation, work)
- Education (level, isStudying, studyingSinceMonth)
- JobContract
- ZUS (isAlreadyRetired, alreadyAccummulated, retirementAge)
- State (age, monthsElapsed)
