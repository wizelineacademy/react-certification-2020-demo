import React from 'react';
import { useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useAuth } from '../../providers/Auth';
import MenuWrapper from './Menu.styled';

function Menu({ toggleDrawer, open }) {
  const { push } = useHistory();
  const { isLoggedIn } = useAuth();

  function handleClose() {
    toggleDrawer(false);
  }

  return (
    <Drawer open={open} onClose={handleClose}>
      <MenuWrapper
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        <List>
          <ListItem button onClick={() => push('/')}>
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
          {isLoggedIn && (
            <>
              <ListItem button onClick={() => push('/favorites')}>
                <ListItemText primary="Favorites" />
              </ListItem>
              <Divider />
            </>
          )}
        </List>
      </MenuWrapper>
    </Drawer>
  );
}

export default Menu;
