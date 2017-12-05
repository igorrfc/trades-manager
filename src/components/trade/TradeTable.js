import React from 'react'

import TradeRow from './TradeRow'

const TradeTable = () => (
  <table>
    <thead>
      <tr>
         <th>Data</th>
         <th>Tipo</th>
         <th>Quantidade de Cotas</th>
         <th>Valor por Cota</th>
         <th>Valor Total</th>
      </tr>
    </thead>

    <tbody>
      <TradeRow />
    </tbody>
  </table>
)

export default TradeTable;
