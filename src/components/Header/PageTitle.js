import React, { Component } from 'react';

import {Col, Row, Container} from "react-bootstrap"

const PageTitle = (header, subheader) => {

  return(

    <Container className="container">
      <Row className="p-1 align-items-center">
        <Col xs={12}>
          <div className="intro m-0">
            <div className="intro-content">
              <span>Your Assets</span>
              <h3 className="mt-3 mb-0">Inventory</h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

  )
}

export default PageTitle;