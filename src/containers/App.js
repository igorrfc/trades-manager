import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import TradesBoard from './tradesboard/TradesBoard'

class App extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={12}>
            <header>
              <h1>TradesManager</h1>
            </header>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col xs={12} md={12}>
            <TradesBoard />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App;
