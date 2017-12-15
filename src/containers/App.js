import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { last } from 'ramda'

import TradesBoard from './tradesboard/TradesBoard'
import { Loading, Header } from '../components'

import * as tradeActions from '../actions/trade'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }
  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps

    setTimeout(() => {
      this.setState({ loading })
    }, 3000)
  }

  render() {
    const { loading } = this.state
    const {
      getCurrentSharesValue,
      trades: { amountBalances, currentSharesValue }
    } = this.props

    return (
      <div>
        <Header
          amountBalance={
            last(amountBalances) ? last(amountBalances).amountBalance : 0
          }
          currentSharesValue={currentSharesValue}
          getCurrentSharesValue={getCurrentSharesValue}
        />

        <section className="app-content">
          <TradesBoard loading={loading} />

          {loading && <Loading />}
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(tradeActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
