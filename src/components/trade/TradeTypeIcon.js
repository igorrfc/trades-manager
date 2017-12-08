import React from 'react'
import classnames from 'classnames'

import './TradeTypeIcon.css'

import { Arrow } from '../icons'

const TradeTypeIcon = ({ type }) => {
  const className = classnames({
    'tradetypeicon-subscription': type === 0,
    'tradetypeicon-redemption': type === 1
  })
  return <Arrow className={className} />
}

export default TradeTypeIcon
