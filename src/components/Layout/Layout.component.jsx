import React, { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';
import DivContainer from './Layout.styled';

function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <DivContainer>
      <Navbar toggleDrawer={setOpenDrawer} />
      <Menu open={openDrawer} toggleDrawer={setOpenDrawer} />
      {children}
    </DivContainer>
  );
}

export default Layout;
