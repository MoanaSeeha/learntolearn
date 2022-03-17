import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './QuestionList';
import {Col, Row} from "react-bootstrap"

// TODO: show tokens, what this question is worth
const Quiz = ({ test_slug,test_name, step, questions, totalQuestions, score, handleAnswerClick, handleEnterPress }) => {
  const tokens = questions[0].tokens;

  return (
    <div className="quiz">
      <Row>
        <Col xs={10}>
          <div className="quiz-name">{test_name}</div>
          <div className="quiz-name">{test_slug}</div>
          <div className="question-count">
            <div className="description">Question <span className="question-number">{step}</span> of {totalQuestions}</div>
          </div>
        </Col>
        <Col xs={2}>
          <div className="score-container">
            <div className="description">Reward <span className="score">{tokens}</span> Learn</div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>

        <div className="questions">
          <QuestionList
            questions={questions}
            handleAnswerClick={handleAnswerClick}
            handleEnterPress={handleEnterPress}
          />
        </div>
        </Col>
      </Row>
    </div>
  );
}

Quiz.propTypes = {
  test_name: PropTypes.string.isRequired,
  test_slug: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired,
  //showQuiz: PropTypes.number.isRequired,
};

export default Quiz;
