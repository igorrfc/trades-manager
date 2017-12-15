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

export const updateTrade = trade => ({
  types: [
    actionTypes.UPDATE_TRADE_START,
    actionTypes.UPDATE_TRADE_SUCCESS,
    actionTypes.UPDATE_TRADE_FAILURE
  ],
  payload: {
    request: {
      url: `trades/${trade.id}.json`,
      method: 'put',
      data: { trade }
    }
  }
})

export const createTrades = list => ({
  types: [
    actionTypes.CREATE_TRADES_START,
    actionTypes.CREATE_TRADES_SUCCESS,
    actionTypes.CREATE_TRADES_FAILURE
  ],
  payload: {
    request: {
      url: `investments.json`,
      method: 'post',
      data: {
        investment: {
          trades_attributes: list
        }
      }
    }
  }
})

export const getCurrentSharesValue = () => ({
  types: [
    actionTypes.REQUEST_SHARES_VALUE_START,
    actionTypes.REQUEST_SHARES_VALUE_SUCCESS,
    actionTypes.REQUEST_SHARES_VALUE_FAILURE
  ],
  payload: {
    request: {
      url: `funds/1/prices.json`
    }
  }
})

export const cancelTransaction = () => ({
  type: actionTypes.CANCEL_TRANSACTION
})
