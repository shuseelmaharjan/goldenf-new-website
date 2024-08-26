import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Navbar/Sidebar';

function Layout({ children }) {
  const location = useLocation();
  const pathname = location.pathname;

  const renderLayout = () => {
    switch (true) {
      case pathname === '/login':
        return (
          <div>{children}</div>
        );
      
      case pathname === '/dashboard' || pathname === '/exam':
        return (
          <>
            <Sidebar />
            <div>{children}</div>
          </>
        );

      case pathname === '/' || pathname === '/courses':
      default:
        return (
          <>
            <Navbar />
            <div>{children}</div>
            <Footer />
          </>
        );
    }
  };

  return renderLayout();
}

export default Layout;
