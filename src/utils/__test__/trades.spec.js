import { all } from 'ramda'
import { calculateTradesBalance } from '../trades'

describe('calculateTradesBalance function', () => {
  describe("when the trades's amount balance is positive", () => {
    it('returns a list of valid objects', () => {
      const tradesList = [
        { kind: 0, shares: 10 },
        { kind: 1, shares: 10 },
        { kind: 0, shares: 10 }
      ]

      const isTradeValid = trade => trade.valid

      const validatedTrades = calculateTradesBalance(tradesList)

      expect(all(isTradeValid)(validatedTrades)).toBeTruthy()
    })
  })

  describe("when the trades's amount balance is negative", () => {
    it('returns invalid objects when a negative balance is reached', () => {
      const tradesList = [
        { kind: 0, shares: 10 },
        { kind: 1, shares: 20 },
        { kind: 0, shares: 20 },
        { kind: 1, shares: 30 }
      ]

      const validatedTrades = calculateTradesBalance(tradesList)

      expect(validatedTrades[1].valid).toBeFalsy()
      expect(validatedTrades[3].valid).toBeFalsy()
    })
  })
})
