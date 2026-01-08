import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border dark:border-[#3e342a] px-6 lg:px-10 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 text-text-main dark:text-white group">
          <div className="size-8 text-primary transition-transform group-hover:scale-110">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-extrabold leading-tight tracking-[-0.015em]">PawMate</h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-bold transition-colors ${isActive('/') ? 'text-primary' : 'hover:text-primary text-gray-600 dark:text-gray-300'}`}>Home</Link>
          <Link to="/requests" className={`text-sm font-bold transition-colors ${isActive('/requests') ? 'text-primary' : 'hover:text-primary text-gray-600 dark:text-gray-300'}`}>Requests</Link>
          <Link to="/messages" className={`text-sm font-bold transition-colors ${isActive('/messages') ? 'text-primary' : 'hover:text-primary text-gray-600 dark:text-gray-300'}`}>Messages</Link>
          <Link to="/reports" className={`text-sm font-bold transition-colors ${isActive('/reports') ? 'text-primary' : 'hover:text-primary text-gray-600 dark:text-gray-300'}`}>Safety</Link>
          <Link to="/about" className={`text-sm font-bold transition-colors ${isActive('/about') ? 'text-primary' : 'hover:text-primary text-gray-600 dark:text-gray-300'}`}>About Us</Link>
          <Link to="/contact" className={`text-sm font-bold transition-colors ${isActive('/contact') ? 'text-primary' : 'hover:text-primary text-gray-600 dark:text-gray-300'}`}>Contact</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden sm:flex items-center bg-surface-light dark:bg-surface-dark border border-border dark:border-[#3e342a] rounded-full px-4 py-2 w-64 focus-within:border-primary/50 transition-colors">
          <span className="material-symbols-outlined text-text-muted text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search breeds..."
            className="bg-transparent border-none text-sm w-full focus:ring-0 placeholder:text-text-muted/70 text-text-main dark:text-white"
          />
        </div>


        <ThemeToggle />

        <Link to="/notifications" className="flex items-center justify-center rounded-full size-10 hover:bg-surface-light dark:hover:bg-[#3e342a] transition-colors text-text-main dark:text-white relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-background-dark"></span>
        </Link>

        <Link
          to="/profile"
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20 cursor-pointer block"
          style={{ backgroundImage: `url("${user?.profileImage || 'https://picsum.photos/200'}")` }}
          title="View Profile"
        ></Link>
      </div>
    </header>
  );
};

export default Navbar;
