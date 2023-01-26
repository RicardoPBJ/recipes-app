import React from 'react';
import { Button, Input } from '../components';
import { handlers } from '../hooks';

function Login() {
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
        eventClick={ clickSetStorageEmail }
        testId="login-submit-btn"
        isDisabled={ isDisabled }
        type="button"
      />
    </div>
  );
}

export default Login;
