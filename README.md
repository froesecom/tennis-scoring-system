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
- try to keep single responsibilty in mind
- make it extensible so it could handle a full tennis match or different rules
- use linters and prettiers
- I didn't validate any inputs to functions, but put comments everywhere that should be done. This was just to save time.

## Domain modeling
### Match
- delegates to other classes
- provides the client interface

### Game
- Simple class that only knows about it's own state and nothing else

### TennisSet
- only knows about it's own state and how it initialize Games
- doesn't know about the implementation of Games or what they do/mean

### Umpire
- has no state
- functions only return booleans
- knows when games/sets/matches are complete... ie, knows the rules of tennis
- doesn't know anything about how to present scores
- doesn't have side effects
- NOTE: _the matchComplete function is not complete_. The exercise spec said to only worry about one set. This function can be extended to work like real tennis, ie best of 3 or 5 sets

### ScoreKeeper
- knows how to increment points and mark games/sets complete when told
- doesn't know why it does the things it does

### ScoreReporter
- knows the logic behind reporting on scores
- can create a data structure representing the current score
- doesn't know the rules of tennis, ie, what the scores mean
- doesn't know how to present the score in a human readable way (it delegates that the GameScorePresenter)

### GameScorePresenter
- knows how to take a data representation of the score (from the ScoreReporter) and present it in a human readable way

## Improvements/Extensions
- Umpire class is too big and should be broken into umpires for each type (Game/TennisSet/Match)
- I don't like how Player index is passed around. The order of players passed into the Match initializer matters or the score report makes no sense, and I kind of got carried away passing the index around rather than the player instance.
- Match class might be a bit of a God object and could be simplified
- a bunch of functions need refactoring... I left comments where I could
- a lot more integration tests
- tests for private functions
