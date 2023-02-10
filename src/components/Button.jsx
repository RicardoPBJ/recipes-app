import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Button.css';

function Button({
  nameButton,
  id,
  testId,
  isDisabled,
  eventClick,
  type,
  value,
}) {
  return (
    <button
      type={ type }
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
  id: PropTypes.string,
  eventClick: PropTypes.func,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  value: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  testId: null,
  id: null,
  isDisabled: false,
  eventClick: null,
  value: '*',
};

export default Button;
