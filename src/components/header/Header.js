import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import './Header.css'

const Header = () => (
  <header className="header">
    <Container>
      <Row>
        <Col>
          <h2>Trading Board</h2>
          <h1>Fake Trade Company ®</h1>
        </Col>
      </Row>
    </Container>
  </header>
)

export default Header
