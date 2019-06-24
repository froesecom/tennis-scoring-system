# Tennis Scoring System Exercise
_note: see `EXERCISE.md` for a description of the exercise._
### Tech

Built using Node 11.6
Includes:
- TypeScript
- Jest configured for TS (testing framework)
- ts-node (TypeScript execution for NodeJS)
- Prettier + config (Code formatting)
- TSLint + config

### To install
- clone repo
- `yarn install`

### To run
- `yarn run dummy-match` to run a fake tennis match and see example output from the program.
- `yarn test` to run tests

## Approach
- TDD... write unit tests and then implement the function
- I didn't validate any inputs to functions, but put comments everywhere that should be done. This was just to save time.

## Domain modeling
### Game
- Simple class that only knows about it's own state and nothing else
