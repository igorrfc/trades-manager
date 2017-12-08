import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Alert } from 'reactstrap'
import { any, difference, isNil, isEmpty } from 'ramda'

import * as tradeActions from '../../actions/trade'

import { TradeTable } from '../../components'

import './TradesBoard.css'

const findCreatedAndModifiedTrades = trades => ({
  newTrades: trades.draftList.filter(trade => isNil(trade.id)),
  modifiedTrades: difference(trades.draftList, trades.list).filter(
    trade => trade.id
  )
})

const isAmountBalanceInvalid = amountBalances =>
  any(trade => !trade.valid)(amountBalances)

export class TradesBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      savingDisabled: true
    }
  }

  componentWillMount() {
    const { fetchTradesList } = this.props

    fetchTradesList()
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

    if (!savingDisabled && isAmountBalanceInvalid(trades.amountBalances)) {
      this.setState({
        savingDisabled: true
      })
    }

    if (
      savingDisabled &&
      !isAmountBalanceInvalid(trades.amountBalances) &&
      (!isEmpty(newTrades) || !isEmpty(modifiedTrades))
    ) {
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

  renderAlert() {
    return (
      <Row>
        <Col xs="12">
          <Alert color="danger">
            Não é possível fazer o resgate de um número de cotas maior que o de
            cotas aplicadas
          </Alert>
        </Col>
      </Row>
    )
  }

  render() {
    if (this.props.loading) {
      return null
    }

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
      <div className="tradesboard">
        <Container>
          {isAmountBalanceInvalid(trades.amountBalances) && this.renderAlert()}
          <Row>
            <Col xs="12">
              <div className="tradesboard-table-wrap">
                <TradeTable
                  trades={list}
                  amountBalances={trades.amountBalances}
                  changeTradeAttribute={changeTradeAttribute}
                  removeTrade={removeTrade}
                  className="tradesboard-table"
                />
              </div>
            </Col>
          </Row>
        </Container>

        <div className="tradesboard-bottom fixed-bottom">
          <Container>
            <Row>
              <Col xs="12">
                <Button
                  name="cancelTransaction"
                  onClick={cancelTransaction}
                  className="tradesboard-btn"
                  outline
                  color="danger"
                >
                  Cancelar
                </Button>

                <Button
                  name="saveTrades"
                  disabled={savingDisabled}
                  onClick={() => this.handleTransactionsSaving()}
                  className="tradesboard-btn float-right"
                  color="success"
                >
                  Salvar
                </Button>

                <Button
                  name="newTrade"
                  onClick={newTrade}
                  className="tradesboard-link float-right"
                  color="link"
                >
                  Adicionar nova transação
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
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
