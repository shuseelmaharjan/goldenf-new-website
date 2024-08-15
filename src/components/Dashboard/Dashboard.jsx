import React, { useState } from 'react';
import Sidebar from '../Navbar/Sidebar';


const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    const closeSidebar = () => {
      setSidebarOpen(false);
    };
  
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-[75%]' : 'ml-[20%]'} md:ml-[20%]`}>
          <header className="bg-white shadow-md p-4 flex items-center justify-between">
            <button onClick={toggleSidebar} className="md:hidden">
              <span className="text-2xl">☰</span>
            </button>
            <span className="flex-1 text-center">Username</span>
          </header>
          <main className="flex-1 p-4">
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
          </main>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  