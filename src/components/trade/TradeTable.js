import React from 'react'

import TradeRow from './TradeRow'

const HEADERS = {
  date: 'Data',
  kind: 'Tipo',
  shares: 'Quantidade de Cotas',
  shareValue: 'Valor por Cota',
  totalAmount: 'Valor Total'
}

const TBODY_VALUES_ORDER = Object.keys(HEADERS)

const TradeTable = ({ trades, changeTradeAttribute, removeTrade }) => (
  <table>
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
          changeAttribute={changeTradeAttribute(key)}
          removeTrade={removeTrade(key)}
        />
      ))}
    </tbody>
  </table>
)

export default TradeTable
