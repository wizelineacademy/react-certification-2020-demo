import React, { useReducer, useEffect, createContext, useContext } from 'react';

import { lightTheme, darkTheme } from '../../utils/theme';
import { storage } from '../../utils/storage';
import {
  addFavoriteVideoAction,
  removeFavoriteVideoAction,
  setInverseThemeAction,
} from './userPreferences.actions';
import { userPreferencesReducer, initialState } from './userPreferences.reducer';

const UserPreferencesContext = createContext(null);

function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider!`);
  }
  return context;
}

const userPreferencesStorageKey = 'REACT-CHALLENGE-USER-PREFERENCES';

function getUserStorageKey(user) {
  return user ? `${userPreferencesStorageKey}-${user.id}` : '';
}

const lazyInit = (user) => (state) => {
  const userStorageKey = getUserStorageKey(user);
  const storageObj = storage.has(userStorageKey) ? storage.get(userStorageKey) : {};

  return {
    ...state,
    ...storageObj,
    theme: storageObj.isLightTheme ? lightTheme : darkTheme,
  };
};

const UserPreferencesProvider = ({ children, user }) => {
  const [state, dispatch] = useReducer(
    userPreferencesReducer,
    initialState,
    lazyInit(user)
  );

  console.log(state);

  function isFavoriteVideo(video) {
    return state.favoriteVideos.find((favoriteVideo) => favoriteVideo.id === video.id);
  }

  useEffect(() => {
    const userStorageKey = getUserStorageKey(user);

    if (!user) {
      storage.set(userStorageKey, {
        isLightTheme: state.isLightTheme,
      });
      return;
    }

    storage.set(userStorageKey, {
      favoriteVideos: state.favoriteVideos,
      isLightTheme: state.isLightTheme,
    });
  }, [state.favoriteVideos, user, state.isLightTheme]);

  const value = {
    ...state,
    isFavoriteVideo,
    addFavoriteVideo: addFavoriteVideoAction(dispatch),
    removeFavoriteVideo: removeFavoriteVideoAction(dispatch),
    setInverseTheme: setInverseThemeAction(dispatch),
  };

  function renderChildren() {
    if (typeof children === 'function') {
      return children(state);
    }
    return children;
  }

  return (
    <UserPreferencesContext.Provider value={value}>
      {renderChildren()}
    </UserPreferencesContext.Provider>
  );
};

export { useUserPreferences };
export default UserPreferencesProvider;
