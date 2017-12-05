import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as tradeActions from '../../actions/trade'

import TradeTable from '../../components/trade/TradeTable'

export class TradesBoard extends Component {
  componentWillMount() {
    this.props.fetchTradesList()
  }

  render() {
    const { trades } = this.props

    return (
      <div>
        <TradeTable trades={trades.list} />
      </div>
    )
  }
}

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => bindActionCreators(tradeActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TradesBoard)
