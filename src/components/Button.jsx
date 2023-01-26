import React from 'react';
import PropTypes from 'prop-types';

function Button({
  nameButton,
  id,
  testId,
  labelName,
  isDisabled,
  eventClick,
  type,
}) {
  if (nameButton) {
    return (
      <label htmlFor={ id }>
        {labelName}
        {' '}
        <button
          type={ type !== 'submit' ? 'button' : 'submit' }
          id={ id }
          data-testid={ testId }
          disabled={ isDisabled }
          onClick={ eventClick }
        >
          {nameButton}
        </button>
      </label>
    );
  }

  return (
    <button
      type={ type !== 'submit' ? 'button' : 'submit' }
      id={ id }
      data-testid={ testId }
      disabled={ isDisabled }
      onClick={ eventClick }
    >
      {nameButton}
    </button>
  );
}

Button.propTypes = {
  testId: PropTypes.string.isRequired,
  nameButton: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  id: PropTypes.string,
  eventClick: PropTypes.func,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  labelName: null,
  id: null,
  isDisabled: false,
  eventClick: null,
};

export default Button;
