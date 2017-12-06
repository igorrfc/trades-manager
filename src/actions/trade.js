import { actionTypes } from '../constants'

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

export const changeTradeAttribute = dispatch => key => (attribute, value) =>
  dispatch({
    type: actionTypes.CHANGE_TRADE_ATTRIBUTE,
    field: attribute,
    key,
    value
  })

export const newTrade = () => ({ type: actionTypes.NEW_TRADE })

export const removeTrade = dispatch => key => id => {
  if (id) {
    dispatch({
      key: key,
      types: [
        actionTypes.DELETE_TRADE_START,
        actionTypes.DELETE_TRADE_SUCCESS,
        actionTypes.DELETE_TRADE_FAILURE
      ],
      payload: {
        request: {
          url: `trades/${id}.json`,
          method: 'delete'
        }
      }
    })
    return
  }

  dispatch({
    type: actionTypes.REMOVE_TRADE,
    key: key
  })
}
