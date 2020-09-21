import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { useUserPreferences } from '../../providers/UserPreferences';
import Router from '../Router';

function App() {
  const { theme } = useUserPreferences();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
