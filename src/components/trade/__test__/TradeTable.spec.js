import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import TradeTable from '../TradeTable'
import TradeRow from '../TradeRow'

describe('TradeTable', () => {
  it('renders without crashing', () => {
    const rootDiv = document.createElement('div')
    ReactDOM.render(
      <TradeTable
        trades={[]}
        prices={[]}
        amountBalances={[]}
        changeTradeAttribute={jest.fn()}
        removeTrade={jest.fn()}
      />,
      rootDiv
    )
  })

  describe('table headers', () => {
    let wrapper, headers

    beforeEach(() => {
      wrapper = shallow(
        <TradeTable
          trades={[]}
          prices={[]}
          changeTradeAttribute={jest.fn()}
          removeTrade={jest.fn()}
        />
      )
      headers = wrapper.find('th').map(el => el.text())
    })

    it('must have a Data header', () => {
      expect(headers.filter(h => h === 'Data').length).toBe(1)
    })

    it('must have a Tipo header', () => {
      expect(headers.filter(h => h === 'Tipo').length).toBe(1)
    })

    it('must have a Qtd de Cotas header', () => {
      expect(headers.filter(h => h === 'Qtd de cotas').length).toBe(1)
    })

    it('must have a Valor por Cota header', () => {
      expect(headers.filter(h => h === 'Valor por cota').length).toBe(1)
    })

    it('must have a Valor Total', () => {
      expect(headers.filter(h => h === 'Valor total').length).toBe(1)
    })
  })

  describe('table body', () => {
    it('renders TradeRow components according to the trades prop size', () => {
      const trades = [
        {
          date: '2016-01-25',
          kind: 0,
          shares: '130.0'
        },
        {
          date: '2016-01-25',
          kind: 0,
          shares: '130.0'
        }
      ]
      const wrapper = shallow(
        <TradeTable
          trades={trades}
          prices={[]}
          amountBalances={[{ valid: true }, { valid: true }]}
          changeTradeAttribute={jest.fn()}
          removeTrade={jest.fn()}
        />
      )

      expect(wrapper.find(TradeRow).length).toBe(2)
    })
  })
})
