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
  value,
}) {
  if (labelName) {
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
          value={ value }
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
      value={ value }
    >
      {nameButton}
    </button>
  );
}

Button.propTypes = {
  nameButton: PropTypes.string.isRequired,
  testId: PropTypes.string,
  labelName: PropTypes.string,
  id: PropTypes.string,
  eventClick: PropTypes.func,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  value: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  labelName: null,
  testId: null,
  id: null,
  isDisabled: false,
  eventClick: null,
  value: '*',
};

export default Button;
