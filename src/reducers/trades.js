import moment from 'moment'

import { actionTypes } from '../constants'

const EMPTY_TRADE = { date: moment().format('YYYY-MM-DD'), kind: 0, shares: '0.0' }

const initialState = { list: [], draftList: [], draftEnabled: false }

const cloneCollection = (collection) => collection.map((item) => ({...item}))

const changeResourceAttribute = (collection, data) => {
  let newCollection = cloneCollection(collection)
  const resource = newCollection[data.key]
  resource[data.field] = data.value

  return newCollection;
};

const insertNewTrade = (collection) => {
  let newCollection = cloneCollection(collection)
  newCollection.push(EMPTY_TRADE)
  return newCollection
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_TRADES_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        draftList: action.payload.data,
      }
    case actionTypes.CHANGE_TRADE_ATTRIBUTE:
      return {
        ...state,
        draftList: changeResourceAttribute(state.draftList, {
          key: action.key,
          field: action.field,
          value: action.value,
        }),
        draftEnabled: true,
      }
    case actionTypes.NEW_TRADE:
    return {
      ...state,
      draftList: insertNewTrade(state.draftList),
      draftEnabled: true,
    }
    default:
      return state;
  }
}
