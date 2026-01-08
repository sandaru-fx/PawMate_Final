import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin': return 'Dashboard';
      case '/admin/users': return 'User Management';
      case '/admin/dogs': return 'Dog Profiles';
      case '/admin/settings': return 'Settings';
      case '/admin/reports': return 'Reports';
      default: return 'PawMate Admin';
    }
  };

  return (
    <header className="flex-none px-6 md:px-8 py-6 flex justify-between items-center z-20">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-300">menu</span>
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-white">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block w-64">
          <label className="relative block group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              className="w-full bg-[#2d1b3d]/50 border border-white/10 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#7f13ec] placeholder-gray-500 text-sm"
              placeholder="Search..."
              type="text"
            />
          </label>
        </div>

        <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-300">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#191022]"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;