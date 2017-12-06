import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

import * as tradeActions from '../../actions/trade'

import TradeTable from '../../components/trade/TradeTable'

export class TradesBoard extends Component {
  componentWillMount() {
    this.props.fetchTradesList()
  }

  render() {
    const {
      trades,
      changeTradeAttribute,
      newTrade,
      removeTrade,
      cancelTransaction
    } = this.props
    let list = trades.list

    if (trades.draftEnabled) {
      list = trades.draftList
    }

    return (
      <Container>
        <Row>
          <Col>
            <TradeTable
              trades={list}
              changeTradeAttribute={changeTradeAttribute}
              removeTrade={removeTrade}
            />
            <a onClick={newTrade}>Inserir nova transação</a>
            <button
              name="cancelTransaction"
              onClick={cancelTransaction}
              type="button"
            >
              Cancelar
            </button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(tradeActions, dispatch),
  changeTradeAttribute: tradeActions.changeTradeAttribute(dispatch),
  removeTrade: tradeActions.removeTrade(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TradesBoard)
