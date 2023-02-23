import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { push } = useHistory();

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

  function clickSetStorageEmail() {
    localStorage.setItem('user', JSON.stringify({ email }));

    push('/meals');
  }

  useEffect(() => {
    const lim = 7;

    const emailRegex = /[\w.]+@[a-z]+(\.com|(\.[a-z]+){1,3})/i;

    setIsDisabled(password.length < lim || !emailRegex.test(email));
  }, [email, password]);

  return {
    handlerChange,
    clickSetStorageEmail,
    email: useMemo(() => email, [email]),
    password: useMemo(() => password, [password]),
    isDisabled: useMemo(() => isDisabled, [isDisabled]),
  };
}
