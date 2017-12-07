import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { difference, isNil, isEmpty } from 'ramda'

import * as tradeActions from '../../actions/trade'

import TradeTable from '../../components/trade/TradeTable'

const findCreatedAndModifiedTrades = trades => ({
  newTrades: trades.draftList.filter(trade => isNil(trade.id)),
  modifiedTrades: difference(trades.draftList, trades.list).filter(
    trade => trade.id
  )
})

export class TradesBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      savingDisabled: true
    }
  }

  componentWillMount() {
    this.props.fetchTradesList()
  }

  componentDidUpdate(prevProps) {
    const { savingDisabled } = this.state
    const { trades } = this.props
    const { newTrades, modifiedTrades } = findCreatedAndModifiedTrades(
      this.props.trades
    )

    if (prevProps.trades.draftEnabled && !trades.draftEnabled) {
      this.setState({
        savingDisabled: true
      })
    }

    if (savingDisabled && (!isEmpty(newTrades) || !isEmpty(modifiedTrades))) {
      this.setState({
        savingDisabled: false
      })
    }
  }

  processSaving() {
    const { trades, updateTrade, createTrades } = this.props
    const { newTrades, modifiedTrades } = findCreatedAndModifiedTrades(trades)

    if (!isEmpty(newTrades) && !isEmpty(modifiedTrades)) {
      return modifiedTrades
        .map(trade => updateTrade(trade))
        .concat(createTrades(newTrades))
    }

    if (!isEmpty(modifiedTrades)) {
      return modifiedTrades.map(trade => updateTrade(trade))
    }

    return [createTrades(newTrades)]
  }

  handleTransactionsSaving() {
    Promise.all(this.processSaving()).then(data => {
      this.props.fetchTradesList()
    })
  }

  render() {
    const {
      trades,
      changeTradeAttribute,
      newTrade,
      removeTrade,
      cancelTransaction
    } = this.props
    const { savingDisabled } = this.state
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
              name="saveTrades"
              type="button"
              disabled={savingDisabled}
              onClick={() => this.handleTransactionsSaving()}
            >
              Salvar movimentações
            </button>

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
