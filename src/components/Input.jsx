import React from 'react';
import PropTypes from 'prop-types';

function Input({
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
      <label htmlFor={ id }>
        {labelName}
        {' '}
        <input
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
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  eventChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  labelName: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  labelName: null,
  id: null,
  placeholder: null,
};

export default Input;
