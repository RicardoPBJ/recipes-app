import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
// import { AuthContext } from '../context/AuthProvider';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      <Input
        name="email"
        labelName="email"
        type="email"
        value={ user.email }
        id="email"
        testId="email-input"
        handleInput={ handleChange }
        placeholder="E-mail"
      />
      <Input
        name="password"
        labelName="password"
        type="password"
        value={ user.password }
        id="password"
        testId="password-input"
        handleInput={ handleChange }
        placeholder="password"
      />
      <Button
        testId="login-submit-btn"
        btnLabel="Enter"
        isDisabled={ false }
        /* handleButton={} */
        types="button"
      />
    </div>
  );
}

export default Login;
