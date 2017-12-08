import moment from 'moment'
import { equals } from 'ramda'

import { actionTypes } from '../constants'
import { calculateTradesBalance } from '../utils/trades'

const EMPTY_TRADE = {
  date: moment().format('YYYY-MM-DD'),
  kind: 0,
  shares: '0.0'
}

const initialState = {
  list: [],
  draftList: [],
  amountBalances: [],
  raftEnabled: false
}

const cloneCollection = collection => collection.map(item => ({ ...item }))

const changeResourceAttribute = (collection, data) => {
  let newCollection = cloneCollection(collection)
  const resource = newCollection[data.key]
  resource[data.field] = data.value

  return newCollection
}

const insertNewTrade = collection => {
  let newCollection = cloneCollection(collection)
  newCollection.push(EMPTY_TRADE)
  return newCollection
}

const removeTrade = (collection, { key }) => {
  const newCollection = cloneCollection(collection)
  newCollection.splice(key, 1)

  return newCollection
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_TRADES_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        draftList: action.payload.data,
        amountBalances: calculateTradesBalance(action.payload.data),
        draftEnabled: false
      }
    case actionTypes.CHANGE_TRADE_ATTRIBUTE:
      return {
        ...state,
        draftList: changeResourceAttribute(state.draftList, {
          key: action.key,
          field: action.field,
          value: action.value
        }),
        amountBalances: calculateTradesBalance(
          changeResourceAttribute(state.draftList, {
            key: action.key,
            field: action.field,
            value: action.value
          })
        ),
        draftEnabled: true
      }
    case actionTypes.NEW_TRADE:
      return {
        ...state,
        draftList: insertNewTrade(state.draftList),
        amountBalances: calculateTradesBalance(insertNewTrade(state.draftList)),
        draftEnabled: true
      }
    case actionTypes.REMOVE_TRADE:
      return {
        ...state,
        draftList: removeTrade(state.draftList, { key: action.key }),
        draftEnabled: !equals(
          removeTrade(state.draftList, { key: action.key }),
          state.list
        ),
        amountBalances: calculateTradesBalance(
          removeTrade(state.draftList, { key: action.key })
        )
      }
    case actionTypes.DELETE_TRADE_SUCCESS:
      return {
        ...state,
        list: removeTrade(state.draftList, {
          key: action.meta.previousAction.key
        }),
        draftList: removeTrade(state.draftList, {
          key: action.meta.previousAction.key
        }),
        amountBalances: calculateTradesBalance(
          removeTrade(state.draftList, {
            key: action.meta.previousAction.key
          })
        )
      }
    case actionTypes.CANCEL_TRANSACTION:
      return {
        ...state,
        draftList: cloneCollection(state.list),
        amountBalances: calculateTradesBalance(state.list),
        draftEnabled: false
      }
    default:
      return state
  }
}
