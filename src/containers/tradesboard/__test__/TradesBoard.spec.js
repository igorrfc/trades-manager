import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { Alert } from 'reactstrap'

import { TradesBoard } from '../TradesBoard'

describe('TradesBoard', () => {
  let rootDiv

  beforeEach(() => {
    rootDiv = document.createElement('div')
  })

  it('renders without crashing', () => {
    ReactDOM.render(
      <TradesBoard
        trades={{ list: [], amountBalances: [] }}
        prices={{ list: [] }}
        fetchTradesList={jest.fn()}
        changeTradeAttribute={jest.fn()}
        newTrade={jest.fn()}
      />,
      rootDiv
    )
  })

  describe('.componentWillMount', () => {
    it('calls the fetchTradesList prop', () => {
      const fetchTradesList = jest.fn()
      ReactDOM.render(
        <TradesBoard
          trades={{ list: [], amountBalances: [] }}
          prices={{ list: [] }}
          fetchTradesList={fetchTradesList}
          changeTradeAttribute={jest.fn()}
          newTrade={jest.fn()}
        />,
        rootDiv
      )
      expect(fetchTradesList).toHaveBeenCalled()
    })
  })

  describe('when there is an invalid shares amount balance', () => {
    it('show an Alert component', () => {
      const wrapper = shallow(
        <TradesBoard
          trades={{ list: [], amountBalances: [{ valid: false }] }}
          prices={{ list: [] }}
          fetchTradesList={jest.fn()}
          changeTradeAttribute={jest.fn()}
          newTrade={jest.fn()}
        />
      )

      expect(wrapper.find(Alert).length).toEqual(1)
    })
  })

  describe('when the insert new trade link is clicked', () => {
    it('calls the newTrade action creator received as prop', () => {
      const newTrade = jest.fn()
      const wrapper = shallow(
        <TradesBoard
          trades={{ list: [], amountBalances: [] }}
          prices={{ list: [] }}
          fetchTradesList={jest.fn()}
          changeTradeAttribute={jest.fn()}
          newTrade={newTrade}
        />
      )

      wrapper.findWhere(el => el.prop('name') === 'newTrade').simulate('click')

      expect(newTrade).toHaveBeenCalled()
    })
  })

  describe('when the cancelTransaction button is clicked', () => {
    it('calls the cancelTransaction action creator received as prop', () => {
      const cancelTransaction = jest.fn()
      const wrapper = shallow(
        <TradesBoard
          trades={{ list: [], amountBalances: [] }}
          prices={{ list: [] }}
          fetchTradesList={jest.fn()}
          changeTradeAttribute={jest.fn()}
          newTrade={jest.fn()}
          cancelTransaction={cancelTransaction}
        />
      )

      wrapper
        .findWhere(el => el.prop('name') === 'cancelTransaction')
        .simulate('click')

      expect(cancelTransaction).toHaveBeenCalled()
    })
  })

  describe('when the saveTrades button is clicked', () => {
    let wrapper, saveTradesBtn, trades, updateTrade, createTrades

    beforeEach(() => {
      updateTrade = jest.fn()
      createTrades = jest.fn()
    })

    describe('and there is both modifiedTrades and new ones', () => {
      beforeEach(() => {
        trades = {
          list: [
            { id: 1, date: '2016-01-25', kind: 0, shares: '130.0' },
            { id: 2, date: '2016-02-25', kind: 0, shares: '200.0' },
            { id: 3, date: '2016-02-25', kind: 1, shares: '210.0' }
          ],
          draftList: [
            { id: 1, date: '2016-01-25', kind: 0, shares: '130.0' },
            { id: 2, date: '2016-02-25', kind: 1, shares: '200.0' },
            { id: 3, date: '2016-02-25', kind: 1, shares: '200.0' },
            { date: '2016-03-25', kind: 1, shares: '210.0' },
            { date: '2016-03-25', kind: 0, shares: '210.0' }
          ],
          amountBalances: []
        }

        wrapper = shallow(
          <TradesBoard
            trades={trades}
            prices={{ list: [] }}
            fetchTradesList={jest.fn()}
            changeTradeAttribute={jest.fn()}
            newTrade={jest.fn()}
            cancelTransaction={jest.fn()}
            updateTrade={updateTrade}
            createTrades={createTrades}
          />
        )

        saveTradesBtn = wrapper.findWhere(
          el => el.prop('name') === 'saveTrades'
        )
      })

      it('calls the updateTrade function for each modified and already persisted trade', () => {
        saveTradesBtn.simulate('click')
        expect(updateTrade).toHaveBeenCalledTimes(2)
        expect(updateTrade).toHaveBeenLastCalledWith({
          id: 3,
          date: '2016-02-25',
          kind: 1,
          shares: '200.0'
        })
      })

      it('calls createTrades function sending all the new trades', () => {
        saveTradesBtn.simulate('click')
        expect(createTrades).toHaveBeenCalled()
        expect(createTrades).toHaveBeenCalledWith([
          { date: '2016-03-25', kind: 1, shares: '210.0' },
          { date: '2016-03-25', kind: 0, shares: '210.0' }
        ])
      })
    })

    describe('and there is only new trades', () => {
      beforeEach(() => {
        trades = {
          list: [{ id: 1, date: '2016-01-25', kind: 0, shares: '130.0' }],
          draftList: [
            { id: 1, date: '2016-01-25', kind: 0, shares: '130.0' },
            { date: '2016-03-25', kind: 1, shares: '210.0' },
            { date: '2016-03-25', kind: 0, shares: '210.0' }
          ],
          amountBalances: []
        }

        wrapper = shallow(
          <TradesBoard
            trades={trades}
            prices={{ list: [] }}
            fetchTradesList={jest.fn()}
            changeTradeAttribute={jest.fn()}
            newTrade={jest.fn()}
            cancelTransaction={jest.fn()}
            updateTrade={updateTrade}
            createTrades={createTrades}
          />
        )

        saveTradesBtn = wrapper.findWhere(
          el => el.prop('name') === 'saveTrades'
        )
      })

      it('calls only the createTrades function', () => {
        saveTradesBtn.simulate('click')
        expect(updateTrade).not.toHaveBeenCalled()
        expect(createTrades).toHaveBeenCalled()
      })
    })

    describe('and there is only modified and  already persisted trades', () => {
      beforeEach(() => {
        trades = {
          list: [{ id: 1, date: '2016-01-25', kind: 0, shares: '130.0' }],
          draftList: [{ id: 1, date: '2016-01-25', kind: 1, shares: '130.0' }],
          amountBalances: []
        }

        wrapper = shallow(
          <TradesBoard
            trades={trades}
            prices={{ list: [] }}
            fetchTradesList={jest.fn()}
            changeTradeAttribute={jest.fn()}
            newTrade={jest.fn()}
            cancelTransaction={jest.fn()}
            updateTrade={updateTrade}
            createTrades={createTrades}
          />
        )

        saveTradesBtn = wrapper.findWhere(
          el => el.prop('name') === 'saveTrades'
        )
      })

      it('calls only the updateTrade function', () => {
        saveTradesBtn.simulate('click')
        expect(createTrades).not.toHaveBeenCalled()
        expect(updateTrade).toHaveBeenCalled()
      })
    })
  })
})
