import { removeTrade } from '../trade'
import { actionTypes } from '../../constants'

describe('removeTrade action creator', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
  })

  describe('when the trade has an id', () => {
    it('emits an object action to operate a remote request', () => {
      removeTrade(dispatch)(0)(1)
      expect(dispatch).toHaveBeenCalledWith({
        key: 0,
        types: [
          actionTypes.DELETE_TRADE_START,
          actionTypes.DELETE_TRADE_SUCCESS,
          actionTypes.DELETE_TRADE_FAILURE
        ],
        payload: {
          request: {
            url: `trades/1.json`,
            method: 'delete'
          }
        }
      })
    })
  })

  describe('when the trade does not have an id', () => {
    it('emits an object action to remove the trade', () => {
      removeTrade(dispatch)(0)()
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.REMOVE_TRADE,
        key: 0
      })
    })
  })
})
