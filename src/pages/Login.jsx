import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { handlersLogin } from '../hooks';
import '../styles/Login.css';

export default function Login() {
  const {
    handlerChange,
    clickSetStorageEmail,
    email,
    password,
    isDisabled,
  } = handlersLogin();

  return (
    <div className="login-box">
      <div className="login">
        <Form.Control
          name="email"
          type="email"
          value={ email }
          data-testid="email-input"
          onChange={ handlerChange }
          placeholder="e-mail"
          className="mb-3 form-item"
        />
        <Form.Control
          name="password"
          type="password"
          value={ password }
          data-testid="password-input"
          onChange={ handlerChange }
          placeholder="password"
          className="form-item"
        />
        <div className="mt-4 col-md-12 text-center">
          <Button
            variant={ isDisabled ? 'light' : 'outline-success' }
            onClick={ clickSetStorageEmail }
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            type="button"
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
}
