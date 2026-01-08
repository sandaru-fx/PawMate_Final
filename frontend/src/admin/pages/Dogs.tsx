import React, { useState, useEffect, useRef } from 'react';
import { Dog } from '../types';
import api from '../services/api';
import gsap from 'gsap';

// Mock Data for consistent demo usage
const MOCK_DOGS: Dog[] = [
  { id: '1', name: 'Buster', breed: 'Golden Retriever', age: 3, gender: 'Male', images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80'], owner: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=1' }, status: 'approved' },
  { id: '2', name: 'Rocky', breed: 'Bulldog', age: 2, gender: 'Male', images: ['https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80'], owner: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=2' }, status: 'pending' },
  { id: '3', name: 'Bella', breed: 'Poodle', age: 4, gender: 'Female', images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80'], owner: { name: 'Emma', avatar: 'https://i.pravatar.cc/150?u=3' }, status: 'approved' },
  { id: '4', name: 'Thor', breed: 'Husky', age: 1, gender: 'Male', images: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=500&q=80'], owner: { name: 'James', avatar: 'https://i.pravatar.cc/150?u=4' }, status: 'rejected' },
  { id: '5', name: 'Max', breed: 'Beagle', age: 5, gender: 'Male', images: ['https://images.unsplash.com/photo-1517423568366-6975535405c3?auto=format&fit=crop&w=500&q=80'], owner: { name: 'Linda', avatar: 'https://i.pravatar.cc/150?u=5' }, status: 'pending' },
  { id: '6', name: 'Luna', breed: 'Labrador', age: 2, gender: 'Female', images: ['https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?auto=format&fit=crop&w=500&q=80'], owner: { name: 'Tom', avatar: 'https://i.pravatar.cc/150?u=6' }, status: 'approved' },
];

const Dogs = () => {
  const [dogs, setDogs] = useState<Dog[]>(MOCK_DOGS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter effect
  const filteredDogs = filter === 'all' ? dogs : dogs.filter(d => d.status === filter);

  useEffect(() => {
    // Animation when filter changes
    const ctx = gsap.context(() => {
      gsap.fromTo('.dog-card',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.2)'
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [filter]);

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    // Optimistic update
    setDogs(prev => prev.map(dog =>
      dog.id === id ? { ...dog, status: newStatus } : dog
    ));
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-8 h-full">
      {/* Header / Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-1">
        <div className="flex-1">
          <h1 className="text-3xl font-black text-white mb-2">Dog Profiles</h1>
          <p className="text-gray-400">Manage pending approvals and the overall pack.</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                        px-6 py-2.5 rounded-xl font-bold capitalize transition-all duration-300
                        ${filter === status
                  ? 'bg-gradient-to-r from-[#7f13ec] to-purple-500 text-white shadow-lg shadow-[#7f13ec]/30 scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}
                        `}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-[#7f13ec] border-t-white rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
          {filteredDogs.map((dog, index) => (
            <div key={dog.id} className="dog-card glass-panel rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 group shadow-xl border border-white/5 bg-white/[0.02]">
              {/* Image Section */}
              <div className="relative h-72 w-full overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                  <span className={`
                       inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide backdrop-blur-md border shadow-lg
                       ${dog.status === 'pending' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' : ''}
                       ${dog.status === 'approved' ? 'bg-green-500/20 border-green-500/30 text-green-300' : ''}
                       ${dog.status === 'rejected' ? 'bg-red-500/20 border-red-500/30 text-red-300' : ''}
                     `}>
                    <span className={`w-2 h-2 rounded-full ${dog.status === 'pending' ? 'bg-yellow-400 animate-pulse' :
                      dog.status === 'approved' ? 'bg-green-400' : 'bg-red-400'
                      }`}></span>
                    {dog.status}
                  </span>
                </div>

                <img src={dog.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'} alt={dog.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#191022] via-[#191022]/40 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-3xl font-black text-white leading-tight mb-2 drop-shadow-md">{dog.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-200 font-medium">
                    <span className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">{dog.breed}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{dog.age} Years</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{dog.gender}</span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-5 flex flex-col gap-5">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group/owner">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
                      <img src={dog.owner?.avatar || `https://ui-avatars.com/api/?name=${dog.owner?.name}&background=random`} alt="Owner" className="size-full rounded-full object-cover border-2 border-[#191022]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Belongs to</span>
                      <span className="text-sm font-bold text-white group-hover/owner:text-[#7f13ec] transition-colors">{dog.owner?.name || 'Unknown'}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-gray-500 group-hover/owner:text-white transition-colors text-[20px]">arrow_forward</span>
                </div>

                {dog.status === 'pending' ? (
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button
                      onClick={() => handleStatusChange(dog.id, 'rejected')}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm hover:bg-red-500 hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[18px]">close</span>
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange(dog.id, 'approved')}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 font-bold text-sm hover:bg-green-500 hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                      Approve
                    </button>
                  </div>
                ) : (
                  <button className="w-full py-3 rounded-xl border border-white/10 text-gray-400 text-sm font-bold hover:bg-white/5 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2 group/btn">
                    View Full Profile
                    <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dogs;
