import { combineReducers } from 'redux'

import trades from './trades'
import appStatus from './appStatus'

export default combineReducers({
  appStatus,
  trades
})
