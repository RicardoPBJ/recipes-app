/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from 'prop-types';
import { createContext } from 'react';
import Context from './createContext';

export default function ContextProvider({ children }) {
  return (
    <Context.Provider value={ undefined }>
      { children }
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};
