import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useAuth } from '../../providers/Auth';
import { LoginPromptAlert, LoginPromptTextField } from './LoginPrompt.styled';

function LoginPrompt({ isOpen, close }) {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const user = await login(username, password);

    if (user) {
      close();
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Login</DialogTitle>
      <DialogContent>
        {error && <LoginPromptAlert severity="error">{error}</LoginPromptAlert>}
        <LoginPromptTextField
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          fullWidth
        />
        <LoginPromptTextField
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary" autoFocus disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginPrompt;
