import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { isEmpty } from 'ramda'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { date } from '../../constants'

import { Remove } from '../icons'

import './Header.css'

class Header extends Component {
  componentWillMount() {
    this.props.getCurrentSharesValue()
  }

  renderSharesBalance() {
    const { amountBalance, currentSharesValue } = this.props

    return (
      <div className="sharesbalance">
        <Row>
          <Col>
            <div className="sharesbalance-label">
              <span>Data</span>
            </div>
            <span>{moment(currentSharesValue.date).format('DD/MM/YYYY')}</span>
          </Col>

          <Col>
            <Col xs={{ offset: 4 }}>
              <div className="sharesbalance-label">
                <span>Saldo</span>
              </div>

              <span>{amountBalance}</span>
            </Col>
          </Col>

          <Col>
            <Col xs={{ offset: 4 }}>
              <Remove className="sharesbalance-multiplier" />
            </Col>
          </Col>

          <Col>
            <div className="sharesbalance-label">
              <span>Valor</span>
            </div>

            {currentSharesValue.price}
          </Col>

          <Col>
            <Col xs={{ offset: 4 }}>
              <span className="sharesbalance-equal">=</span>
            </Col>
          </Col>

          <Col>
            <div className="sharesbalance-label">
              <span>Total</span>
            </div>
            <span className="sharesbalance-amount">
              {amountBalance * currentSharesValue.price}
            </span>
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    const { currentSharesValue } = this.props

    return (
      <header className="header">
        <Container>
          <Row>
            <Col>
              <h2>Trading Board</h2>
              <h1>Fake Trade Company ®</h1>
            </Col>
          </Row>

          {!isEmpty(currentSharesValue) && this.renderSharesBalance()}
        </Container>
      </header>
    )
  }
}

export default Header
