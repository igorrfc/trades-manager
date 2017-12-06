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

export const changeTradeAttribute = (dispatch) => (key) => (attribute, value) => (
  dispatch({
    type: actionTypes.CHANGE_TRADE_ATTRIBUTE,
    field: attribute,
    key,
    value
  })
)
