// Layout.js
import React from 'react';
import Navi from './Nav';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navi />
      {children}
    </div>
  );
};

export default Layout;
