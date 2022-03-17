import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap"
import PropTypes from "prop-types"
import QuestionList from "../Quiz/QuestionList"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


const RoadmapContent = ({ headerClassName }) => {
// const HeaderLinks = props => {
  // center  mx-auto

  return (


    <div className="game-content-wrapper">
      <Container fluid={false}>
        <Row>
          <Col xs={12} md={4} lg={4}>

            <h3>Integration with Games</h3>

            <p>We currently offer a white glove service for integrating with UNITY and UNREAL ENGINE.  We will soon offer a public API to integrate with your project.</p>
            <p>Your game can easily become educational and offer several more incentives for playing.</p>
            <p>Players will be able to earn LEARN Tokens in addition to any other reward your game offers.  You will receive a 2.5 percent commission on Claimed LEARN Tokens and we will receive another 2.5 percent.</p>
            <ul>
              <li>Greater Incentives to Play</li>
              <li>2.5% Commission</li>
              <li>Make any Game Educational</li>
              <li>Custom Questions</li>
            </ul>

            <h4>Contact Us</h4>
            <p>Fill out <a href="https://forms.gle/GH6VxsvTqLg2q85aA" target="_blank" rel="noreferrer">this form</a> to tell us more about your project.</p>
          </Col>

          <Col xs={12} md={8} lg={8}>

            image

          </Col>
        </Row>
      </Container>

      <Container fluid={false}>
        <Row>

          <Col xs={12} md={8} lg={8}>

            CODEPEN CODE HERE!
            <p>NO VUE APP FOR NOW</p>

          </Col>

          <Col xs={12} md={4} lg={4}>

            <h3>Phase II Tests</h3>

            <p>We are currently working on version 2 of our programming tests.  Our next version will allow users to actually fix and submit code which will be tested in real time.</p>

            <p>We will provide detailed ranking and analysis based on factors such as accuracy and time taken to finish programming problems.</p>

          </Col>

        </Row>
      </Container>
    </div>

  );
};

RoadmapContent.propTypes = {
  headerClassName: PropTypes.string,
};

export default RoadmapContent;