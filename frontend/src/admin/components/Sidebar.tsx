import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../services/api';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = React.useState('Loading...');

  React.useEffect(() => {
    // Function to load profile
    const loadProfile = async () => {
      try {
        const { data } = await api.get('/admin/profile');
        setAdminName(data.name || 'Admin');
      } catch (err) {
        console.error('Failed to load admin profile', err);
        setAdminName('Admin');
      }
    };

    // Load initial
    loadProfile();

    // Listen for updates
    window.addEventListener('adminProfileUpdate', loadProfile);
    return () => window.removeEventListener('adminProfileUpdate', loadProfile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pawmate_token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/admin' },
    { name: 'User Management', icon: 'group', path: '/admin/users' },
    { name: 'Dog Profiles', icon: 'pets', path: '/admin/dogs' },
    // { name: 'Matches', icon: 'favorite', path: '/admin/matches' }, // Coming soon
    { name: 'Reports', icon: 'flag', path: '/admin/reports' },
    { name: 'Settings', icon: 'settings', path: '/admin/settings' }, // Placeholder path
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      <aside className={`w-64 flex-shrink-0 flex flex-col border-r border-white/5 bg-[#1a1122] h-full fixed md:relative z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#7f13ec] to-purple-400 bg-center bg-no-repeat aspect-square rounded-full size-10 flex items-center justify-center shadow-[0_0_15px_rgba(127,19,236,0.5)]">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>pets</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold tracking-tight">PawMate</h1>
              <p className="text-[#ad92c9] text-xs font-medium uppercase tracking-wider">Admin Console</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 gap-2 flex flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => onClose()}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                ${isActive
                  ? 'bg-[#7f13ec]/20 text-white border border-[#7f13ec]/20 shadow-[0_0_10px_rgba(127,19,236,0.2)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <span className={`material-symbols-outlined ${item.path === '/dogs' ? 'fill-1' : ''}`}>{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500"></div>
            <div>
              <p className="text-sm font-bold text-white">{adminName}</p>
              <p className="text-xs text-[#ad92c9]">Super Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
