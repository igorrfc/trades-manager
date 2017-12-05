import { actionTypes } from '../constants/'

export const fetchTradesList = () => ({
  types: [
    actionTypes.REQUEST_TRADES_START,
    actionTypes.REQUEST_TRADES_SUCCESS,
    actionTypes.REQUEST_TRADES_FAILURE
  ],
  payload: {
    request: {
      url: `trades.json`
    }
  }
})
