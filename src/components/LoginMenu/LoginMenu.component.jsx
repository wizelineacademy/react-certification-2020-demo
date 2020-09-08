/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { useAuth } from '../../providers/Auth';

function LoginMenu({ setLoginDialogOpen }) {
  const { user, isLoggedIn, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleMenuItemClose() {
    setAnchorEl(null);
  }

  const doLogin = () => {
    setLoginDialogOpen(true);
    handleMenuItemClose();
  };

  const doLogout = () => {
    logout();
    handleMenuItemClose();
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <Avatar src={user?.avatarUrl} alt="user" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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
