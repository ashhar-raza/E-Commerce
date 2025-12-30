import React from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const noScrollRoutes = ['/login', '/signup'];

const Layout = ({ children }) => {
  const location = useLocation();
  const noScroll = noScrollRoutes.includes(location.pathname);

  return (
    <div className="h-screen w-full">
      {/* Navbar */}
      <Navbar />

      {/* Page container */}
      <main
        className={`h-[90vh]  bg-neutral-950 ${
          noScroll ? 'overflow-hidden' : 'overflow-auto'
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
