import React from 'react';
import Loader from 'react-loader-spinner';

import UserPreferencesProvider from '../../providers/UserPreferences';
import AuthProvider from '../../providers/Auth';
import VideoProvider from '../../providers/Video';
import { useGapi } from '../../utils/hooks/useGapi';
import ThemedApp from '../ThemedApp';
import DivLoader from './App.styled';

function App() {
  const [gapi, error] = useGapi();

  if (!gapi) {
    return (
      <DivLoader>
        <Loader type="Circles" width={50} height={50} color="#556cd6" visible />
      </DivLoader>
    );
  }

  return (
    <AuthProvider>
      <VideoProvider>
        <UserPreferencesProvider>
          <ThemedApp error={error} />
        </UserPreferencesProvider>
      </VideoProvider>
    </AuthProvider>
  );
}

export default App;
