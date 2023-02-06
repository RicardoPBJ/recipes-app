import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(JSON
    .parse(localStorage.getItem(key)) || initialValue);

  const setValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  const clearValue = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  const clearStorage = () => {
    localStorage.clear();
  };

  return {
    storedValue,
    setValue,
    clearValue,
    clearStorage };
}
