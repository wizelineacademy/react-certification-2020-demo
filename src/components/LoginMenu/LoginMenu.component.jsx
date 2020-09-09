import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { useAuth } from '../../providers/Auth';

const TRANSFORM_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

const ANCHOR_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

function LoginMenu({ setLoginDialogOpen }) {
  const { user, isLoggedIn, logout } = useAuth();

  const [anchorElement, setAnchorElement] = useState(null);

  const open = Boolean(anchorElement);

  function handleMenu(event) {
    setAnchorElement(event.currentTarget);
  }

  function handleMenuItemClose() {
    setAnchorElement(null);
  }

  function doLogin() {
    setLoginDialogOpen(true);
    handleMenuItemClose();
  }

  function doLogout() {
    logout();
    handleMenuItemClose();
  }

  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <Avatar src={user?.avatarUrl || null} alt="user" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElement}
        anchorOrigin={ANCHOR_ORIGIN}
        keepMounted
        transformOrigin={TRANSFORM_ORIGIN}
        open={open}
        onClose={handleMenuItemClose}
      >
        {isLoggedIn ? (
          <MenuItem onClick={doLogout}>Cerrar Sesion</MenuItem>
        ) : (
          <MenuItem onClick={doLogin}>Iniciar sesion</MenuItem>
        )}
      </Menu>
    </>
  );
}

export default LoginMenu;
