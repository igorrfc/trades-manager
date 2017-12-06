import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as tradeActions from '../../actions/trade'

import TradeTable from '../../components/trade/TradeTable'

export class TradesBoard extends Component {
  componentWillMount() {
    this.props.fetchTradesList()
  }

  render() {
    const { trades, changeTradeAttribute, newTrade, removeTrade } = this.props
    let list = trades.list

    if (trades.draftEnabled) {
      list = trades.draftList
    }

    return (
      <div>
        <TradeTable
          trades={list}
          changeTradeAttribute={changeTradeAttribute}
          removeTrade={removeTrade}
        />
        <a onClick={newTrade}>Inserir nova transação</a>
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
