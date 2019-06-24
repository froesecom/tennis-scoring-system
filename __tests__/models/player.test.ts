import { Player } from '../../models/player'

test('index initialisation', () => {
  const player = new Player({ name: 'Player 1', index: 0 })
  expect(player.index).toBeDefined()
})

test('name initialisation', () => {
  const name = 'Player 1'
  const player = new Player({ name: name, index: 0 })
  expect(player.name).toBe(name)
})
