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

const TradeTable = ({ trades, changeTradeAttribute }) => (
  <table>
    <thead>
      <tr>
         <th>{HEADERS.date}</th>
         <th>{HEADERS.kind}</th>
         <th>{HEADERS.shares}</th>
         <th>{HEADERS.shareValue}</th>
         <th>{HEADERS.totalAmount}</th>
      </tr>
    </thead>

    <tbody>
      {
        trades.map((trade, key) => (
          <TradeRow
            key={key}
            trade={trade}
            dataOrder={TBODY_VALUES_ORDER}
            changeAttribute={changeTradeAttribute(key)}
          />
        ))
      }
    </tbody>
  </table>
)

export default TradeTable;
