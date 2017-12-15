import React from 'react'
import { Table } from 'reactstrap'

import TradeRow from './TradeRow'

const HEADERS = {
  date: 'Data',
  kind: 'Tipo',
  shares: 'Qtd de cotas',
  shareValue: 'Valor por cota',
  totalAmount: 'Valor total'
}

const TBODY_VALUES_ORDER = Object.keys(HEADERS)

const getSharesValue = (prices, { tradeDate }) => {
  const priceMatched = prices.filter(price => price.date === tradeDate)[0]

  if (priceMatched) {
    return parseFloat(priceMatched.price)
  }

  return 0
}

const TradeTable = ({
  trades,
  prices,
  changeTradeAttribute,
  removeTrade,
  className,
  amountBalances
}) => (
  <Table responsive className={className}>
    <thead>
      <tr>
        <th />
        <th>{HEADERS.date}</th>
        <th>{HEADERS.kind}</th>
        <th>{HEADERS.shares}</th>
        <th>{HEADERS.shareValue}</th>
        <th>{HEADERS.totalAmount}</th>
        <th />
      </tr>
    </thead>

    <tbody>
      {trades.map((trade, key) => (
        <TradeRow
          key={key}
          trade={trade}
          dataOrder={TBODY_VALUES_ORDER}
          sharesValue={getSharesValue(prices, { tradeDate: trade.date })}
          changeAttribute={changeTradeAttribute(key)}
          removeTrade={removeTrade(key)}
          amountBalance={amountBalances[key]}
        />
      ))}
    </tbody>
  </Table>
)

export default TradeTable
