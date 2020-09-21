import React, { useReducer, useEffect, createContext, useContext } from 'react';

import { lightTheme, darkTheme } from '../../utils/theme';
import { storage } from '../../utils/storage';
import { useAuth } from '../Auth';
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
  const storageObject = storage.get(userStorageKey);

  return {
    ...state,
    ...storageObject,
    theme: storageObject?.isLightTheme === false ? darkTheme : lightTheme,
  };
};

const UserPreferencesProvider = ({ children }) => {
  const { user } = useAuth();

  const [state, dispatch] = useReducer(
    userPreferencesReducer,
    initialState,
    lazyInit(user)
  );

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
    favoriteVideos: state.favoriteVideos,
    isLightTheme: state.isLightTheme,
    theme: state.theme,
    isFavoriteVideo,
    addFavoriteVideo: addFavoriteVideoAction(dispatch),
    removeFavoriteVideo: removeFavoriteVideoAction(dispatch),
    setInverseTheme: setInverseThemeAction(dispatch),
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export { useUserPreferences };
export default UserPreferencesProvider;
