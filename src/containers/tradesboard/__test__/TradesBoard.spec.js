import React from 'react';
import ReactDOM from 'react-dom';
import { TradesBoard } from '../TradesBoard';

describe('TradesBoard', () => {
  let rootDiv

  beforeEach(() => {
    rootDiv = document.createElement('div')
  })

  it('renders without crashing', () => {
    ReactDOM.render(
      <TradesBoard
        trades={{list: []}}
        fetchTradesList={jest.fn()}
        changeTradeAttribute={jest.fn()}
      />, rootDiv)
  })

  describe('.componentWillMount', () => {
    it('calls the fetchTradesList prop', () => {
      const fetchTradesList = jest.fn()
      ReactDOM.render(
        <TradesBoard
          trades={{list: []}}
          fetchTradesList={fetchTradesList}
          changeTradeAttribute={jest.fn()}
        />, rootDiv)
      expect(fetchTradesList).toHaveBeenCalled()
    })
  });
})
