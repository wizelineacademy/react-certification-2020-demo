import React from 'react';
import Loader from 'react-loader-spinner';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import UserPreferencesProvider from '../../providers/UserPreferences';
import AuthProvider from '../../providers/Auth';
import VideoProvider from '../../providers/Video';
import { useGapi } from '../../utils/hooks/useGapi';
import Router from '../Router';
import DivLoader from './App.styled';

function App() {
  const gapi = useGapi();

  if (!gapi) {
    return (
      <DivLoader>
        <Loader type="Circles" width={50} height={50} color="#556cd6" visible />
      </DivLoader>
    );
  }

  return (
    <AuthProvider>
      {({ user }) => (
        <VideoProvider>
          <UserPreferencesProvider user={user}>
            {({ theme }) => (
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router />
              </ThemeProvider>
            )}
          </UserPreferencesProvider>
        </VideoProvider>
      )}
    </AuthProvider>
  );
}

export default App;
