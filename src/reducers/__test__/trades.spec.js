import moment from 'moment'

import trades from '../trades'
import { actionTypes } from '../../constants'

describe('trades reducer', () => {
  let initialState

  beforeEach(() => {
    initialState = { list: [], draftList: [], draftEnabled: false }
  })

  describe('REQUEST_TRADES_SUCCESS', () => {
    let action

    beforeEach(() => {
      action = {
        type: actionTypes.REQUEST_TRADES_SUCCESS,
        payload: {}
      }
    })

    it('updates the list and draftList according to payload data', () => {
      action.payload.data = [
        { id: 1, date: '2017-12-08', kind: 0, shares: '10.0' },
        { id: 2, date: '2017-12-08', kind: 0, shares: '10.0' }
      ]

      expect(trades(initialState, action).list).toEqual(action.payload.data)
      expect(trades(initialState, action).draftList).toEqual(
        action.payload.data
      )
    })

    it('orders the trades by date ASC', () => {
      action.payload.data = [
        { id: 1, date: '2017-12-09', kind: 0, shares: '10.0' },
        { id: 2, date: '2017-12-08', kind: 0, shares: '10.0' }
      ]

      expect(trades(initialState, action).list).toEqual([
        { id: 2, date: '2017-12-08', kind: 0, shares: '10.0' },
        { id: 1, date: '2017-12-09', kind: 0, shares: '10.0' }
      ])

      expect(trades(initialState, action).draftList).toEqual([
        { id: 2, date: '2017-12-08', kind: 0, shares: '10.0' },
        { id: 1, date: '2017-12-09', kind: 0, shares: '10.0' }
      ])
    })
  })

  describe('CHANGE_TRADE_ATTRIBUTE', () => {
    it('changes the attribute value of the resource matching the received key', () => {
      const action = {
        type: actionTypes.CHANGE_TRADE_ATTRIBUTE,
        key: 1,
        field: 'date',
        value: '2016-01-22'
      }

      initialState.draftList = [
        { date: '2016-01-25', id: '40', kind: 0, shares: '1.0' },
        { date: '2016-01-25', id: '41', kind: 1, shares: '1.0' },
        { date: '2016-01-25', id: '42', kind: 0, shares: '1.0' }
      ]

      expect(trades(initialState, action).draftList).toEqual([
        { date: '2016-01-25', id: '40', kind: 0, shares: '1.0' },
        { date: '2016-01-22', id: '41', kind: 1, shares: '1.0' },
        { date: '2016-01-25', id: '42', kind: 0, shares: '1.0' }
      ])
    })
  })

  describe('NEW_TRADE', () => {
    it('inserts a new empty trade on the draftList', () => {
      const action = {
        type: actionTypes.NEW_TRADE
      }

      expect(trades(initialState, action).draftList).toEqual([
        { date: moment().format('YYYY-MM-DD'), kind: 0, shares: '0.0' }
      ])
    })
  })

  describe('REMOVE_TRADE', () => {
    let action

    beforeEach(() => {
      action = {
        type: actionTypes.REMOVE_TRADE,
        key: 1
      }

      initialState.draftList = [
        { date: '2016-01-25', id: '40', kind: 0 },
        { date: '2016-01-25', id: '41', kind: 1 },
        { date: '2016-01-25', id: '42', kind: 0 }
      ]
    })

    it('removes the trade matching the received key', () => {
      expect(trades(initialState, action).draftList).toEqual([
        { date: '2016-01-25', id: '40', kind: 0 },
        { date: '2016-01-25', id: '42', kind: 0 }
      ])
    })

    describe('when the new draftList turns equal to the list', () => {
      it('changes the draftEnabled value to false', () => {
        initialState.list = [
          { date: '2016-01-25', id: '40', kind: 0 },
          { date: '2016-01-25', id: '42', kind: 0 }
        ]
        expect(trades(initialState, action).draftEnabled).toBeFalsy()
      })
    })
  })

  describe('CANCEL_TRANSACTION', () => {
    it('rollbacks the draftList to the list value', () => {
      const action = { type: actionTypes.CANCEL_TRANSACTION }

      initialState.list = [
        { date: '2016-01-25', id: '40', kind: 0 },
        { date: '2016-01-25', id: '42', kind: 0 }
      ]

      initialState.draftList = [
        { date: '2016-01-25', id: '40', kind: 0 },
        { date: '2016-01-25', id: '42', kind: 0 },
        { date: '2016-01-25', id: '43', kind: 1 }
      ]

      expect(trades(initialState, action).draftList).toEqual(initialState.list)
    })
  })
})
