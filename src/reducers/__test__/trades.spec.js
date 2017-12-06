import trades from '../trades'
import { actionTypes } from '../../constants'

describe('trades reducer', () => {
  let initialState

  beforeEach(() => {
    initialState = { list: [], draftList: [], draftEnabled: false }
  })

  describe('CHANGE_TRADE_ATTRIBUTE', () => {
    it('changes the attribute value of the resource matching the received key', () => {
      const action = {
        type: actionTypes.CHANGE_TRADE_ATTRIBUTE,
        key: 1,
        field: 'date',
        value: '2016-01-22',
      }

      initialState.draftList = [
        { date: '2016-01-25', id: '40', kind: 0 },
        { date: '2016-01-25', id: '41', kind: 1 },
        { date: '2016-01-25', id: '42', kind: 0 }
      ]

      expect(trades(initialState, action)).toEqual({
        list: [],
        draftList: [
          { date: '2016-01-25', id: '40', kind: 0 },
          { date: '2016-01-22', id: '41', kind: 1 },
          { date: '2016-01-25', id: '42', kind: 0 }
        ],
        draftEnabled: true,
      })
    });
  });
});
