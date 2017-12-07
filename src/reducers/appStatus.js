import { actionTypes } from '../constants'

export default function(state = { loading: false }, action) {
  switch (action.type) {
    case actionTypes.REQUEST_TRADES_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.REQUEST_TRADES_SUCCESS:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
