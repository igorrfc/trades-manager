import { actionTypes } from '../constants'

export default function(state = { list: [] }, action) {
  switch (action.type) {
    case actionTypes.REQUEST_SHARES_VALUE_SUCCESS:
      return {
        ...state,
        list: action.payload.data
      }
    default:
      return state
  }
}
