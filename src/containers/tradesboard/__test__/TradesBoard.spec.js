import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import { TradesBoard } from '../TradesBoard'

describe('TradesBoard', () => {
  let rootDiv

  beforeEach(() => {
    rootDiv = document.createElement('div')
  })

  it('renders without crashing', () => {
    ReactDOM.render(
      <TradesBoard
        trades={{ list: [] }}
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
          trades={{ list: [] }}
          fetchTradesList={fetchTradesList}
          changeTradeAttribute={jest.fn()}
          newTrade={jest.fn()}
        />,
        rootDiv
      )
      expect(fetchTradesList).toHaveBeenCalled()
    })
  })

  describe('when the insert new trade link is clicked', () => {
    it('calls the newTrade action creator received as prop', () => {
      const newTrade = jest.fn()
      const wrapper = shallow(
        <TradesBoard
          trades={{ list: [] }}
          fetchTradesList={jest.fn()}
          changeTradeAttribute={jest.fn()}
          newTrade={newTrade}
        />
      )

      wrapper.find('a').simulate('click')

      expect(newTrade).toHaveBeenCalled()
    })
  })

  describe('when the cancelTransaction button is clicked', () => {
    it('calls the cancelTransaction action creator received as prop', () => {
      const cancelTransaction = jest.fn()
      const wrapper = shallow(
        <TradesBoard
          trades={{ list: [] }}
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
})
