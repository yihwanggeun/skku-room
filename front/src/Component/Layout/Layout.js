// Layout.js
import React from 'react';
import Navi from './Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Navi />
      {children}
    </div>
  );
};

export default Layout;
