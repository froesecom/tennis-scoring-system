type GameRule = { pointsSeperationForWin: 2; minimumPointsToWin: number }
type GameRules = { regular: GameRule; tiebreaker: GameRule }

export const GAME_RULES: GameRules = {
  regular: {
    pointsSeperationForWin: 2,
    minimumPointsToWin: 4,
  },
  tiebreaker: {
    pointsSeperationForWin: 2,
    minimumPointsToWin: 7,
  },
}

type SetRule = {
  gamesSeperationForWin: 2
  minimumGamesToWin: 6
  maxGamesAllowed: 13
}
type SetRules = { regular: SetRule }

export const SET_RULES: SetRules = {
  regular: {
    gamesSeperationForWin: 2,
    minimumGamesToWin: 6,
    maxGamesAllowed: 13,
  },
}
