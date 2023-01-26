import React from 'react';
import propTypes from 'prop-types';
import { Button, Input } from '../components';
import { handlers } from '../hooks';

function Login({ history }) {
  const { handlerChange, clickSetStorageEmail, email, password, isDisabled } = handlers();

  return (
    <div>
      <Input
        name="email"
        labelName="email"
        type="email"
        value={ email }
        id="email"
        testId="email-input"
        eventChange={ handlerChange }
        placeholder="E-mail"
      />
      <Input
        name="password"
        labelName="password"
        id="password"
        type="password"
        value={ password }
        testId="password-input"
        eventChange={ handlerChange }
        placeholder="password"
      />
      <Button
        nameButton="Entrar"
        eventClick={ () => clickSetStorageEmail(history) }
        testId="login-submit-btn"
        isDisabled={ isDisabled }
        type="button"
      />
    </div>
  );
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Login;
