/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

export default function Loading() {
  const [dots, setDots] = useState('loading');
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []);

  useEffect(() => {
    const MILISEG = 170;
    const limDots = 5;

    const timeoutCount = setTimeout(
      () => {
        setDots(dots.padEnd(dots.length + 1, '.'));
        setCount(count + 1);
      },
      MILISEG,
    );

    if (count > limDots) {
      setCount(0);
      setDots('loading');
    }

    return () => clearTimeout(timeoutCount);
  }, [count]);

  return (<h1>{dots}</h1>);
}
