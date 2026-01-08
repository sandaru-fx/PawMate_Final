import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

const UserProfile: React.FC = () => {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || 'Dog lover and enthusiast. Always looking for new playdates!',
        location: 'New York, USA',
        phone: '+1 (555) 123-4567'
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name,
                email: user.email,
                // In a real app, these would come from the backend user object
            }));
        }
    }, [user]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from(headerRef.current, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            // Content Stagger Animation
            gsap.from(contentRef.current?.children || [], {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                delay: 0.3
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically make an API call to update the user profile
        console.log('Saved data:', formData);

        // Success animation hint
        gsap.to(containerRef.current, {
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                gsap.set(containerRef.current, { backgroundColor: 'transparent' });
            }
        });
    };

    return (
        <div ref={containerRef} className="container mx-auto px-4 py-8 pb-32">

            {/* Header / Banner */}
            <div ref={headerRef} className="relative rounded-3xl overflow-hidden h-64 md:h-80 shadow-2xl mb-24 group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-90"></div>
                <img
                    src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2686&auto=format&fit=crop"
                    alt="Cover"
                    className="w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Avatar Section */}
                <div className="absolute -bottom-16 left-6 md:left-12 flex items-end">
                    <div className="relative">
                        <div className="size-32 md:size-40 rounded-full border-4 border-background-light dark:border-background-dark overflow-hidden shadow-xl bg-gray-200">
                            <img
                                src={user?.profileImage || 'https://picsum.photos/200'}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors">
                                <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 rounded-xl text-white font-bold transition-all shadow-lg flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">edit_square</span>
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2.5 bg-red-500/80 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg backdrop-blur-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Grid */}
            <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 pt-10">

                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/50 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/5 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="p-3 rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                                <span className="material-symbols-outlined text-2xl">person</span>
                            </span>
                            <h2 className="text-2xl font-black text-gray-800 dark:text-white">Personal Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-white outline-none transition-all"
                                    />
                                ) : (
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white px-1">{formData.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-white outline-none transition-all"
                                    />
                                ) : (
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white px-1">{formData.location}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email Address</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-white outline-none transition-all"
                                    />
                                ) : (
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white px-1">{formData.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone Number</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-white outline-none transition-all"
                                    />
                                ) : (
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white px-1">{formData.phone}</p>
                                )}
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Bio</label>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-white outline-none transition-all resize-none"
                                    />
                                ) : (
                                    <p className="text-lg text-gray-700 dark:text-gray-300 px-1 leading-relaxed">{formData.bio}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats or other sections could go here */}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <span className="material-symbols-outlined text-9xl">pets</span>
                        </div>
                        <h3 className="text-xl font-black mb-2">My Pets</h3>
                        <p className="text-white/90 mb-6">Manage your registered dogs.</p>

                        <div className="flex -space-x-3 overflow-hidden mb-6">
                            {[1, 2, 3].map((i) => (
                                <img
                                    key={i}
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover"
                                    src={`https://placedog.net/100/100?id=${i}`}
                                    alt={`Dog ${i}`}
                                />
                            ))}
                            <div className="flex items-center justify-center h-12 w-12 rounded-full ring-2 ring-white bg-black/20 text-sm font-bold">+2</div>
                        </div>

                        <button className="w-full py-3 bg-white text-orange-600 font-bold rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                            Manage Pets
                        </button>
                    </div>

                    <div className="bg-white/50 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-white/5 shadow-xl">
                        <h3 className="text-xl font-black text-gray-800 dark:text-white mb-4">Account Status</h3>
                        <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20 mb-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-green-500">verified_user</span>
                                <span className="font-bold text-green-700 dark:text-green-400">Active Member</span>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full py-3 border-2 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white font-bold rounded-xl transition-all"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;
