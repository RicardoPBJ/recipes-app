import React from 'react';
import PropTypes from 'prop-types';

function Input({
  labelStyle,
  inputStyle,
  name,
  labelName,
  type,
  value,
  id,
  testId,
  eventChange,
  placeholder,
}) {
  if (labelName) {
    return (
      <label htmlFor={ id } className={ labelStyle }>
        {labelName}
        {' '}
        <input
          className={ inputStyle }
          type={ type }
          name={ name }
          value={ value }
          id={ id }
          data-testid={ testId }
          onChange={ eventChange }
          placeholder={ placeholder }
        />
      </label>
    );
  }

  return (
    <input
      className={ inputStyle }
      type={ type }
      name={ name }
      value={ value }
      id={ id }
      data-testid={ testId }
      onChange={ eventChange }
      placeholder={ placeholder }
    />
  );
}

Input.propTypes = {
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string,
  value: PropTypes.string,
  eventChange: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
  labelName: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  labelStyle: '',
  inputStyle: '',
  value: undefined,
  type: 'text',
  eventChange: null,
  labelName: null,
  id: null,
  testId: null,
  placeholder: null,
};

export default Input;
