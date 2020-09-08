import React, { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';
import LayoutWrapper from './Layout.styled';

function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <LayoutWrapper>
      <Navbar toggleDrawer={setOpenDrawer} />
      <Menu open={openDrawer} toggleDrawer={setOpenDrawer} />
      {children}
    </LayoutWrapper>
  );
}

export default Layout;
