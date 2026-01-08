import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DogThemedBackground from '../components/DogThemedBackground';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    // Adjust paths to check if they match the user routes structure
    const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen relative text-text-main dark:text-gray-100">
            {!isAuthPage && <DogThemedBackground />}
            {!isAuthPage && <Navbar />}
            <main className="flex-1 w-full relative z-10">
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
};

export default UserLayout;
