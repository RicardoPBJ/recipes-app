import PropTypes from 'prop-types';

function Button({ testId, btnLabel, isDisabled, handleButton, types }) {
  return (
    <button
      type={ types }
      data-testid={ testId }
      disabled={ isDisabled }
      onClick={ handleButton }
    >
      {btnLabel}
    </button>
  );
}

Button.propTypes = {
  testId: PropTypes.string.isRequired,
  types: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
