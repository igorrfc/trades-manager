const SUBSCRIPTION = 0
const REDEMPTION = 1

export const calculateTradesBalance = trades => {
  let validatedList = []

  trades.reduce((amountBalance, trade) => {
    if (trade.kind === SUBSCRIPTION) {
      amountBalance += parseFloat(trade.shares)
    }

    if (trade.kind === REDEMPTION) {
      amountBalance -= parseFloat(trade.shares)
    }

    validatedList.push(
      amountBalance >= 0
        ? { valid: true, amountBalance: amountBalance }
        : { valid: false, amountBalance: amountBalance }
    )

    return amountBalance
  }, 0)

  return validatedList
}
