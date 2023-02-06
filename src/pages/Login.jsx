// import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { Button, Input } from '../components';
import { handlers } from '../hooks';
import '../styles/Login.css';

function Login({ history }) {
  const { handlerChange, clickSetStorageEmail, email, password, isDisabled } = handlers();

  // useEffect(() => {
  //   if (localStorage.length === 0) {
  //     localStorage
  //       .setItem('favoriteRecipes', JSON.stringify([]));
  //   }
  // }, []);

  return (
    <div className="login-box init">
      <div className="login">
        <div>
          <Input
            name="email"
            // labelName="Email"
            type="email"
            value={ email }
            id="email"
            testId="email-input"
            eventChange={ handlerChange }
            placeholder="E-mail"
          />
        </div>
        <div className="mt-3">
          <Input
            name="password"
            // labelName="Password"
            id="password"
            type="password"
            value={ password }
            testId="password-input"
            eventChange={ handlerChange }
            placeholder="password"
          />
        </div>
        <div className="mt-4 col-md-12 text-center">
          <Button
            nameButton="Entrar"
            eventClick={ () => clickSetStorageEmail(history) }
            testId="login-submit-btn"
            isDisabled={ isDisabled }
            type="button"
            className="btn-login"
          />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Login;
