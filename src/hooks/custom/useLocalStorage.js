import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(JSON
    .parse(localStorage.getItem(key)) || initialValue);
  const { push } = useHistory();

  const setValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  const clearValue = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  function handleLogout() {
    localStorage.clear();

    push('/');
  }

  return {
    storedValue,
    handleLogout,
    setValue,
    clearValue,
  };
}
