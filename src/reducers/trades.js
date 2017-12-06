import { actionTypes } from '../constants'

const initialState = { list: [], draftList: [], draftEnabled: false }

const changeResourceAttribute = (collection, data) => {
  let newCollection = collection.map((item) => ({...item}))
  const resource = newCollection[data.key]
  resource[data.field] = data.value

  return newCollection;
};

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
    default:
      return state;
  }
}
