import NavbarTop from 'components/navbar/NavbarTop';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="container">
      <NavbarTop />
      <Outlet />
    </div>
  );
};

export default MainLayout;
