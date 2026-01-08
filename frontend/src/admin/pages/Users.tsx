import React, { useState } from 'react';
import { User } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_USERS: User[] = [
  { id: '1', name: 'Sarah Jones', email: 'sarah.jones@example.com', role: 'user', status: 'active', joinedDate: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=1', dogName: 'Buster', dogBreed: 'Golden Retriever' },
  { id: '2', name: 'Mike Kowalski', email: 'mike.k@example.com', role: 'user', status: 'suspended', joinedDate: 'Sep 12, 2023', avatar: 'https://i.pravatar.cc/150?u=2', dogName: 'Rocky', dogBreed: 'Bulldog' },
  { id: '3', name: 'Emma Lee', email: 'emma.lee88@example.com', role: 'user', status: 'pending', joinedDate: 'Jan 05, 2024', avatar: 'https://i.pravatar.cc/150?u=3', dogName: 'Bella', dogBreed: 'Poodle' },
  { id: '4', name: 'James Parker', email: 'james.p@example.com', role: 'user', status: 'active', joinedDate: 'Dec 15, 2023', avatar: 'https://i.pravatar.cc/150?u=4', dogName: 'Thor', dogBreed: 'Husky' },
  { id: '5', name: 'Linda West', email: 'linda.w@example.com', role: 'user', status: 'active', joinedDate: 'Nov 02, 2023', avatar: 'https://i.pravatar.cc/150?u=5', dogName: 'Max', dogBreed: 'Beagle' },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = MOCK_USERS.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Header / Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-1">
        <div className="flex-1 w-full md:w-auto">
          <h1 className="text-3xl font-black text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage platform users and their pets.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">search</span>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-medium placeholder:text-gray-500"
            />
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 active:scale-95">
            <span className="material-symbols-outlined">person_add</span>
            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>
      </div>

      {/* Premium Table / List */}
      <div className="glass-panel overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl flex-1 flex flex-col shadow-2xl">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-white/5 border-b border-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider items-center">
          <div className="col-span-4">User / Dog Profile</div>
          <div className="col-span-3">Email Contact</div>
          <div className="col-span-2">Joined Date</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1 p-2">
          <AnimatePresence>
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group grid grid-cols-12 gap-4 px-6 py-4 items-center rounded-2xl hover:bg-white/5 transition-all mb-1 border border-transparent hover:border-white/5"
              >
                <div className="col-span-4 flex items-center gap-5">
                  <div className="relative">
                    <div className="size-12 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 to-purple-500">
                      <img src={user.avatar} alt={user.name} className="size-full rounded-full object-cover border-2 border-[#120c18]" />
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-4 border-[#120c18] ${user.status === 'active' ? 'bg-green-500' : user.status === 'suspended' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">{user.name}</p>
                    <p className="text-blue-400 text-xs font-bold flex items-center gap-1.5 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[14px]">pets</span> {user.dogName} ({user.dogBreed})
                    </p>
                  </div>
                </div>

                <div className="col-span-3 text-gray-300 font-medium">{user.email}</div>
                <div className="col-span-2 text-gray-400 text-sm font-medium">{user.joinedDate}</div>

                <div className="col-span-2">
                  <span className={`
                                        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border
                                        ${user.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]' : ''}
                                        ${user.status === 'suspended' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : ''}
                                        ${user.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]' : ''}
                                    `}>
                    <span className={`size-1.5 rounded-full ${user.status === 'active' ? 'bg-green-400' : user.status === 'suspended' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'}`}></span>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>

                <div className="col-span-1 flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button className="size-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-all transform hover:scale-110">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                  <button className="size-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-all transform hover:scale-110">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Users;

