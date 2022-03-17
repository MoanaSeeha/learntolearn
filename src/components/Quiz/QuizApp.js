import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Quiz from './Quiz';
import ModalQuiz from '../Modal/ModalQuiz';
import Results from './Results';
import shuffleQuestions from '../../../helpers/shuffleQuestions';
import QUESTION_DATA from '../../../data/quiz-data'; // TODO: do I have to load all quizzes???
import math_101 from '../../../data/math_101';
import javascript_101 from '../../../data/javascript_101';





class QuizApp extends Component {

  state = {
    ...this.getInitialState(this.props.totalQuestions, this.props.test_slug)
  };

  static propTypes = {
    totalQuestions: PropTypes.number.isRequired,
    test_name: PropTypes.string.isRequired,
    test_slug: PropTypes.string.isRequired
  };

  getInitialState(totalQuestions, test_slug) {

    // load a different test depending on slug
    switch(test_slug) {
      case "math_101":
        totalQuestions = Math.min(totalQuestions, math_101.length);
        break;
      case "javascript_101":
        totalQuestions = Math.min(totalQuestions, javascript_101.length);
        break;
      default:
        totalQuestions = Math.min(totalQuestions, QUESTION_DATA.length);
    }

    const QUESTIONS = shuffleQuestions(math_101).slice(0, totalQuestions);

    return {
      questions: QUESTIONS,
      totalQuestions: totalQuestions,
      userAnswers: QUESTIONS.map(() => {
        return {
          tries: 0
        }
      }),
      step: 1,
      score: 0,
      modal: {
        state: 'hide',
        praise: '',
        points: 0
      }
    };
  }

  handleAnswerClick = (index) => (e) => {
    console.log("e.target.nodeName", e.target.nodeName)
    const { questions, step, userAnswers } = this.state;
    const isCorrect = questions[0].correct === index;
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;
    const tokens = questions[0].tokens;
    // console.log("handleAnswerClick", index);
    // console.log("isCorrect", isCorrect);
    // console.log("tries", tries);


    // sometimes a span is clicked on
    if (isCorrect && (e.target.nodeName === 'LI' || e.target.nodeName === 'SPAN')) {
      // Prevent other answers from being clicked after correct answer is clicked
      e.target.parentNode.style.pointerEvents = 'none';
      console.log("isCorrect", isCorrect);

      // apply to correct container

      if(e.target.nodeName === 'SPAN') {
        //parent = e.target.parentNode;
        console.log("e.target.parentNode", e.target.parentNode);
        e.target.parentNode.classList.add('right');
      } else {
        e.target.classList.add('right');
      }


      userAnswers[currentStep] = {
        tries: tries + 1
      };
      // TODO: report correct answer now or later

      // TODO: figure out the time spent


      // TODO: reset counter

      this.setState({
        userAnswers: userAnswers
      });
      // const dispatch = useDispatch()
      // setTimeout(() => this.showModal(tries, dispatch), 750);

      //setTimeout(() => this.showModal(tries), 750);
      setTimeout(() => this.showModal(tries, tokens), 750);
      setTimeout(this.nextStep, 2750);
    }

    else if (e.target.nodeName === 'LI' ||  e.target.nodeName === 'SPAN') {
      e.target.style.pointerEvents = 'none';

      if(e.target.nodeName === 'SPAN') {
        //parent = e.target.parentNode;
        console.log("e.target.parentNode", e.target.parentNode);
        e.target.parentNode.classList.add('wrong');
      } else {
        e.target.classList.add('wrong');
      }


      userAnswers[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: userAnswers
      });
    }
  };

  handleEnterPress = (index) => (e) => {
    console.log("handleEnterPress", index)
    if (e.keyCode === 13) {
      this.handleAnswerClick(index)(e);
    }
  };

  // showModal = (tries, dispatch) => {
  showModal = (tries, tokens) => {

    let praise;
    let points;
    console.log("tries", tries)
    console.log("tokens", tokens)

    // TODO: points/learn tokens should come from question list
    // TODO: points should depend on number of tries
    switch (tries) {
      case 0: {
        praise = '1st Try!';
        points = tokens;
        break;
      }
      case 1: {
        praise = '2nd Try!';
        points = tokens - 1;
        break;
      }
      case 2: {
        praise = 'Correct!';
        points = tokens - 2;
        break;
      }
      default: {
        praise = 'Correct!';
        points = 0;
      }
    }

    // send dispatch to update unclaimed LEARN unclaimedLearnState
    //dispatch(update_unclaimed_learn(points));

    this.setState({
      modal: {
        state: 'show',
        praise,
        points
      }
    });
  };

  nextStep = () => {
    const { questions, userAnswers, step, score } = this.state;
    const restOfQuestions = questions.slice(1);
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;
    const tokens = questions[0].tokens;

    this.setState({
      step: step + 1,
      //score: this.updateScore(tries, score),
      score: this.updateScore(tries, score, tokens),
      questions: restOfQuestions,
      modal: {
        state: 'hide'
      }
    });
  };

  // TODO: score updates should be more dynamic
  updateScore(tries, score, tokens) {
    // switch (tries) {
    //   case 1: return score + 10;
    //   case 2: return score + 5;
    //   case 3: return score + 2;
    //   default: return score + 1;
    // }

    // TODO: broken here
    // if i answer both correct FIRST TRY, I should have 6 points
    // token 1 and token 2
    // but i get 4 points

    // console.log("try ", tries)
    // console.log("score ", score)
    console.log("tokens ", tokens)

    // TODO: this is breaking everything
    switch (tries) {
      case 1:
        console.log("try 0, ",score + tokens)
        return score + tokens
      case 2:
        console.log("try 1, ",score + (tokens - 1))
        return score + (tokens - 1)
      case 3:
        console.log("try 1, ",score + (tokens - 2))
        return score + (tokens - 2)
      default:
        return score + 0
    }

  }

  restartQuiz = () => {
    this.setState({
      ...this.getInitialState(this.props.totalQuestions, this.props.test_slug)
    });
  };

  render() {
    const { step, questions, userAnswers, totalQuestions, score, modal } = this.state;
    const {  test_name, test_slug } = this.props;
    // wont work here, now use old state???
    // const dispatch = useDispatch()
    // const unclaimedLearnState = useSelector((state) => state.unclaimed_learn_amount.value)

    if (step >= totalQuestions + 1) {
      return (
        <div className="result-wrapper">
          <Results
            score={score}
            restartQuiz={this.restartQuiz}
            userAnswers={userAnswers}
            test_name={test_name}
          />
        </div>

      );
    } else {
      return (
        <div className="quiz-wrapper">
          <Fragment>
            <Quiz
              test_name={test_name}
              test_slug={test_slug}
              step={step}
              questions={questions}
              totalQuestions={totalQuestions}
              score={score}
              // handleAnswerClick={this.handleAnswerClick}
              // handleEnterPress={this.handleEnterPress}
              handleAnswerClick={this.handleAnswerClick}
              handleEnterPress={this.handleEnterPress}
            />
            { modal.state === 'show' && <ModalQuiz modal={modal} /> }
          </Fragment>
        </div>
      );
    }
  }
}

export default QuizApp;
