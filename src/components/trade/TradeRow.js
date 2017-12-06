import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import Select from 'react-select';

const BRAZILIAN_DATE_FORMAT = 'DD/MM/YYYY'

const KIND_LIST = [
  { label: 'Aplicação', value: 0 },
  { label: 'Resgate', value: 1 },
]

const TradeRow = ({ trade, changeAttribute }) => {
  let sharesAmount = ''
  let selectedDate = moment()
  let tradeKindValue = 0

  if (trade) {
    sharesAmount = trade.shares.replace('.', ',')
    selectedDate = moment(trade.date)
    tradeKindValue = trade.kind
  }

  return (
    <tr>
      <td>
        <DatePicker
          name='date'
          selected={selectedDate}
          dateFormat={BRAZILIAN_DATE_FORMAT}
          onChange={(value) => changeAttribute('date', value.format('YYYY-MM-DD'))}
        />
      </td>
      <td>
        <Select
          name='kind'
          options={KIND_LIST}
          value={tradeKindValue}
          onChange={({ value }) => changeAttribute('kind', value)}
        />
      </td>
      <td>
        <NumberFormat
          name='shares'
          fixedDecimalScale
          decimalSeparator=','
          decimalScale={8}
          value={sharesAmount}
          onValueChange={({ value }) => changeAttribute('shares', value)}
        />
      </td>
      <td>
        <NumberFormat
          name='sharesValue'
          fixedDecimalScale
          prefix='R$'
          thousandSeparator='.'
          decimalSeparator=','
          decimalScale={2}
        />
      </td>
      <td>
        <NumberFormat
          disabled
          fixedDecimalScale
          name='totalAmount'
          prefix='R$'
          thousandSeparator='.'
          decimalSeparator=','
          decimalScale={2}
        />
      </td>
    </tr>
  )
}

export default TradeRow;
