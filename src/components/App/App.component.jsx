import React from 'react';
import Loader from 'react-loader-spinner';

import UserPreferencesProvider from '../../providers/UserPreferences';
import AuthProvider from '../../providers/Auth';
import VideoProvider from '../../providers/Video';
import { useGapi } from '../../utils/hooks/useGapi';
import ThemedApp from '../ThemedApp';
import { LoaderWrapper, AppAlert } from './App.styled';

function App() {
  const [gapi, error] = useGapi();

  if (!gapi) {
    return error ? (
      <AppAlert>Error</AppAlert>
    ) : (
      <LoaderWrapper>
        <Loader type="Circles" width={50} height={50} color="#556cd6" visible />
      </LoaderWrapper>
    );
  }

  return (
    <AuthProvider>
      <VideoProvider>
        <UserPreferencesProvider>
          <ThemedApp />
        </UserPreferencesProvider>
      </VideoProvider>
    </AuthProvider>
  );
}

export default App;
