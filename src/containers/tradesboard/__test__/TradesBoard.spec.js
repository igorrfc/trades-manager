import React from 'react';
import ReactDOM from 'react-dom';
import { TradesBoard } from '../TradesBoard';

describe('TradesBoard', () => {
  let rootDiv

  beforeEach(() => {
    rootDiv = document.createElement('div')
  })

  it('renders without crashing', () => {
    ReactDOM.render(<TradesBoard trades={[]} fetchTradesList={jest.fn()} />, rootDiv)
  })

  describe('.componentWillMount', () => {
    it('calls the fetchTradesList prop', () => {
      const fetchTradesList = jest.fn()
      ReactDOM.render(<TradesBoard trades={[]} fetchTradesList={fetchTradesList} />, rootDiv)
      expect(fetchTradesList).toHaveBeenCalled()
    })
  });
})
