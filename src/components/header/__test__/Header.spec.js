import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import Header from '../Header'

describe('Header', () => {
  describe('.componentWillMount', () => {
    it('calls the getCurrentSharesValue action creator', () => {
      const div = document.createElement('div')
      const getCurrentSharesValue = jest.fn()

      ReactDOM.render(
        <Header
          amountBalance={0}
          currentSharesValue={{
            price: 10.0,
            date: ''
          }}
          getCurrentSharesValue={getCurrentSharesValue}
        />,
        div
      )

      expect(getCurrentSharesValue).toHaveBeenCalled()
    })
  })
})
