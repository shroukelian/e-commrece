import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col"> 
      <Navbar />
      
      <main className="flex-grow"> 
        <div className="container mx-auto py-8">
            <Outlet />
        </div>
      </main>
      
      <Toaster />
      <Footer />
    </div>
  );
}