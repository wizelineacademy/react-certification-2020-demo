import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SeachBar from '../SearchBar';
import LoginMenu from '../LoginMenu';
import ThemeSwitch from '../ThemeSwitch';
import LoginPrompt from '../LoginPrompt';
import useStyles from './Navbar.styled';

function Navbar({ toggleDrawer }) {
  const classes = useStyles();

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <SeachBar />
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <ThemeSwitch />
          <LoginMenu setLoginDialogOpen={setLoginDialogOpen} />
        </div>
      </Toolbar>
      <LoginPrompt isOpen={loginDialogOpen} close={() => setLoginDialogOpen(false)} />
    </AppBar>
  );
}

export default Navbar;
