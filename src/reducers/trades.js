import { actionTypes } from '../constants'

const initialState = { list: [] }

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_TRADES_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
      }
    default:
      return state;
  }
}
