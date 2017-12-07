import React, { Component } from 'react'
import { connect } from 'react-redux'

import TradesBoard from './tradesboard/TradesBoard'
import { Loading, Header } from '../components'

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

    return (
      <div>
        <Header />

        <section className="app-content">
          <TradesBoard loading={loading} />

          {loading &&
            <Loading />
          }
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)
