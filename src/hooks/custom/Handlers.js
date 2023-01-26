import { useState, useEffect } from 'react';

export default function Handlers() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  function handlerChange({ target: { name, value } }) {
    switch (name) {
    case 'email':
      setEmail(value);
      break;

    case 'password':
      setPassword(value);
      break;

    default:
    }
  }

  function clickSetStorageEmail(history) {
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/meals');
  }

  useEffect(() => {
    const lim = 7;

    const emailRegex = /[\w.]+@[a-z]+(\.com|(\.[a-z]+){2,3})/i;

    setIsDisabled(password.length < lim || !emailRegex.test(email));
  }, [email, password]);

  return {
    handlerChange,
    clickSetStorageEmail,
    email,
    password,
    isDisabled,
  };
}
