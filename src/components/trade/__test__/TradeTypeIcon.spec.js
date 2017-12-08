import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import TradeTypeIcon from '../TradeTypeIcon'

describe('TradeTypeIcon', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(<TradeTypeIcon type={0} />, div)
  })

  describe('when the type prop is equals to 0', () => {
    it('has the tradetypeicon-subscription class', () => {
      const wrapper = shallow(<TradeTypeIcon type={0} />)

      expect(wrapper.prop('className')).toEqual('tradetypeicon-subscription')
    })
  })

  describe('when the type prop is equals to 1', () => {
    it('has the tradetypeicon-redemption class', () => {
      const wrapper = shallow(<TradeTypeIcon type={1} />)

      expect(wrapper.prop('className')).toEqual('tradetypeicon-redemption')
    })
  })
})
