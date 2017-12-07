import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import TotalAmountInput from '../TotalAmountInput'

describe('TotalAmountInput', () => {
  it('renders without crashing', () => {
    const td = document.createElement('td')

    ReactDOM.render(<TotalAmountInput shares={0.0} sharesValue={0} />, td)
  })

  it('has zero as the default value', () => {
    const wrapper = shallow(<TotalAmountInput shares={0.0} sharesValue={0} />)

    expect(wrapper.prop('value')).toEqual(0)
  })

  describe('when the shares and sharesValue are different than zero', () => {
    it('has the multiplication of the shares by the sharesValue as its value', () => {
      const wrapper = shallow(
        <TotalAmountInput shares={1.0} sharesValue={10} />
      )

      expect(wrapper.prop('value')).toEqual(10)
    })
  })

  describe('when only the shares is different than zero', () => {
    it('has zero as its value', () => {
      const wrapper = shallow(<TotalAmountInput shares={1.0} sharesValue={0} />)

      expect(wrapper.prop('value')).toEqual(0)
    })
  })

  describe('when only the sharesValue is different than zero', () => {
    it('has zero as its value', () => {
      const wrapper = shallow(<TotalAmountInput shares={0.0} sharesValue={1} />)

      expect(wrapper.prop('value')).toEqual(0)
    })
  })
})
