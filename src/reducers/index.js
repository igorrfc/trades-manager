import { combineReducers } from 'redux'

import trades from './trades'
import prices from './prices'
import appStatus from './appStatus'

export default combineReducers({
  appStatus,
  trades,
  prices
})
