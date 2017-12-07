import React from 'react'
import NumberFormat from 'react-number-format'
import { all } from 'ramda'

const biggerThanZero = n => parseFloat(n) > 0

const TotalAmountInput = ({ shares, sharesValue }) => {
  return (
    <NumberFormat
      disabled
      fixedDecimalScale
      name="totalAmount"
      prefix="R$"
      value={
        all(biggerThanZero)([shares, sharesValue]) ? shares * sharesValue : 0
      }
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
    />
  )
}

export default TotalAmountInput
