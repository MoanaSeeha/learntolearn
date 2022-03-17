import React from 'react';
import { render } from 'react-dom';
import QuizApp from './components/Quiz/QuizApp';

render(
  <QuizApp totalQuestions={10} />,
  document.getElementById('app')
);
