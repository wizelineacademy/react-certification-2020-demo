import React, { useReducer, useEffect, useContext } from 'react';

import { storage } from '../../utils/storage';
import { loginAction, logoutAction } from './auth.actions';
import { authReducer, initialState } from './auth.reducer';

const AuthContext = React.createContext(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider!`);
  }
  return context;
}

const authStorageKey = 'REACT-CHALLENGE-AUTH';

function lazyInit(state) {
  return {
    ...state,
    user: storage.has(authStorageKey) ? storage.get(authStorageKey) : null,
  };
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, lazyInit);

  useEffect(() => {
    if (state.user) {
      storage.set(authStorageKey, state.user);
    } else {
      storage.remove(authStorageKey);
    }
  }, [state.user]);

  const value = {
    ...state,
    login: loginAction(dispatch),
    logout: logoutAction(dispatch),
    isLoggedIn: Boolean(state.user),
  };

  function renderChildren() {
    if (typeof children === 'function') {
      return children(state);
    }
    return children;
  }

  return <AuthContext.Provider value={value}>{renderChildren()}</AuthContext.Provider>;
}

export { useAuth };
export default AuthProvider;
