//import React from 'react';

const QUESTION_DATA = [
  {
    question: "Which of the following is TRUE about reflows and repaints?",
    answers: [
      "They're the same thing.",
      "Repaints (or redraws) occur when elements change their visual styles but not layout.",
      "Reflows compute layout, are more performance critical, and occur when elements are inserted, removed, moved, animated, etc.",
      "The previous two answers are correct."
    ],
    correct: 3,
    tokens: 1
  },
  {
    question: "What are the three types of JavaScript errors?",
    answers: [
      "Parse Errors, Syntax Errors and Runtime Errors.",
      "Loading Errors, Runtime Errors and Logic Errors.",
      "Syntax Errors, Logic Errors and Loading Errors.",
      "Bad Errors, Very Bad Errors, and Fatal Errors."
    ],
    correct: 1,
    tokens: 1
  },
  {
    question: "What's a closure?",
    answers: [
      "An inner function that has access to an outer function's variables, even after the outer function has executed.",
      "A stateful function; a function that preserves state.",
      "The combination of a function and the lexical environment within which that function was declared.",
      "All of the above."
    ],
    correct: 3,
    tokens: 2
  },
  {
    question: "Where might you find, or how might you use a closure in JavaScript?",
    answers: [
      "When currying or implementing partial application.",
      "To emulate private methods.",
      "In event handlers, timers, and asynchronous callbacks.",
      "All of the above."
    ],
    correct: 3,
    tokens: 3
  },
  {
    question: "Which of these is a use case for the <code>bind</code>, <code>call</code>, or <code>apply</code> methods?",
    answers: [
      "You can use <code>call</code> or <code>apply</code> to borrow methods from other objects.",
      "You can use <code>bind</code> for partial function application.",
      "If you're using the <code>map</code> method to run a function on an array and you need to preserve the <code>this</code> context, you can use <code>bind</code>.",
      "All of the above."
    ],
    correct: 3,
    tokens: 4
  },
  {
    question: "What does the <code>bind</code> method do?",
    answers: [
      "Returns a function that, when executed, will call the original function with a <code>this</code> context that you pass in.",
      "Prevents the value of <code>this</code> from being overridden by <code>call</code> or <code>apply</code>.",
      "Allows you to implement partial application of a function.",
      "All of the above."
    ],
    correct: 3,
    tokens: 5
  }
];

export default QUESTION_DATA;
