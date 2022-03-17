import React from 'react';
import PropTypes from 'prop-types';

const ModalQuiz = ({ modal: { state, praise, points } }) => {
  return (
    <div className={'correct-modal' + (state === 'show' ? ' modal-enter' : '')}>
      <div className="praise">{praise}</div>
      <div className="points">{points} LEARN</div>
    </div>
  );
};

ModalQuiz.propTypes = {
  modal: PropTypes.shape({
    state: PropTypes.string.isRequired,
    praise: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
  })
};

export default ModalQuiz;
