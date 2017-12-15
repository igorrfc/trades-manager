import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import Select from 'react-select'
import classnames from 'classnames'
import { isEmpty } from 'ramda'

import { Remove } from '../icons'
import TotalAmountInput from './TotalAmountInput'
import TradeTypeIcon from './TradeTypeIcon'

import { date } from '../../constants'

const KIND_LIST = [
  { label: 'Aplicação', value: 0 },
  { label: 'Resgate', value: 1 }
]

class TradeRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sharesValue: props.sharesValue
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sharesValue !== this.props.sharesValue) {
      this.setState({
        sharesValue: this.props.sharesValue
      })
    }
  }

  handleSharesValueChange(value) {
    const validValue = Number.isInteger(value) ? value : 0

    this.setState({
      sharesValue: validValue
    })
  }

  render() {
    const {
      trade,
      changeAttribute,
      removeTrade,
      amountBalance,
      sharesValue: sharesValueDefault
    } = this.props
    const { sharesValue } = this.state
    const sharesInputClasses = classnames({
      'form-control': true,
      'tradesboard-form-control': true,
      'is-invalid': !amountBalance.valid
    })
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
        <td className="tradesboard-table-icon-column tradesboard-table-icon-column-arrow text-center">
          <a className="tradesboard-table-arrow">
            <TradeTypeIcon type={tradeKindValue} />
          </a>
        </td>

        <td>
          <DatePicker
            name="date"
            selected={selectedDate}
            dateFormat={date.BRAZILIAN_DATE_FORMAT}
            onChange={value =>
              changeAttribute('date', value.format('YYYY-MM-DD'))
            }
            className="form-control tradesboard-form-control"
          />
        </td>

        <td>
          <Select
            name="kind"
            options={KIND_LIST}
            value={tradeKindValue}
            onChange={({ value }) => changeAttribute('kind', value)}
            className="tradesboard-select-control"
          />
        </td>

        <td>
          <NumberFormat
            name="shares"
            fixedDecimalScale
            decimalSeparator=","
            decimalScale={8}
            value={sharesAmount}
            onValueChange={({ value }) =>
              changeAttribute('shares', isEmpty(value) ? '0' : value)
            }
            className={sharesInputClasses}
          />
        </td>

        <td>
          <NumberFormat
            disabled={sharesValueDefault !== 0}
            name="sharesValue"
            fixedDecimalScale
            prefix="R$"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            onValueChange={({ floatValue }) =>
              this.handleSharesValueChange(floatValue)
            }
            value={sharesValue}
            className="form-control tradesboard-form-control"
          />
        </td>

        <td>
          <TotalAmountInput
            shares={trade.shares}
            sharesValue={sharesValue}
            className="form-control tradesboard-form-control"
          />
        </td>

        <td className="tradesboard-table-icon-column tradesboard-table-icon-column-remove text-center">
          <a
            onClick={() => removeTrade(trade.id)}
            className="tradesboard-table-remove"
          >
            <Remove />
          </a>
        </td>
      </tr>
    )
  }
}

export default TradeRow
