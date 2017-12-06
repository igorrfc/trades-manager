import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Select from 'react-select';
import DatePicker from 'react-datepicker'
import NumberFormat from 'react-number-format'

import TradeRow from '../TradeRow'

describe('TradeRow', () => {
  it('renders without crashing', () => {
    const tbody = document.createElement('tbody')
    const trade = {
      date: '2016-01-25',
      kind: 0,
      shares: '130.0'
    };
    ReactDOM.render(<TradeRow trade={trade} changeAttribute={jest.fn()} />, tbody)
  })

  describe('child components', () => {
    let wrapper, tdElements

    beforeEach(() => {
      wrapper = shallow(
        <TradeRow
          trade={{
            date: '2016-01-25',
            kind: 0,
            shares: '130.0'
          }}
          changeAttribute={jest.fn()}
        />
      )

      tdElements = wrapper.find('td')
    })

    it('renders the date input as the first td element', () => {
      const input = tdElements.at(0).find(DatePicker)

      expect(input.length).toEqual(1)
      expect(input.prop('name')).toBe('date')
    });

    it('renders the kind input as the second td element', () => {
      const input = tdElements.at(1).find(Select)

      expect(input.length).toEqual(1)
      expect(input.prop('name')).toBe('kind')

    });

    it('renders the shares input as the third td element', () => {
      const input = tdElements.at(2).find(NumberFormat)

      expect(input.length).toEqual(1)
      expect(input.prop('name')).toBe('shares')

    });

    it('renders the sharesValue input as the fourth td element', () => {
      const input = tdElements.at(3).find(NumberFormat)

      expect(input.length).toEqual(1)
      expect(input.prop('name')).toBe('sharesValue')

    });

    it('renders the totalAmount input as the fifth td element', () => {
      const input = tdElements.at(4).find(NumberFormat)

      expect(input.length).toEqual(1)
      expect(input.prop('name')).toBe('totalAmount')

    });
  });
});
