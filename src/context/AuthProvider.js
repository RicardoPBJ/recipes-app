import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const authBtn = ({ email, password }) => {
    const MIN_PASSWD = 6;

    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    const validEmail = emailRegex.test(email);

    const passwdValid = password.length > MIN_PASSWD; setBtnDisabled(!(validEmail && passwdValid));
  };

  const values = useMemo(() => ({

  }), []);

  return (
    <AuthContext.Provider value={ values }>
      { children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default AuthProvider;
