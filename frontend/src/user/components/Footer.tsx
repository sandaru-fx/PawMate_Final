import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative w-full z-10 border-t border-white/10 mt-auto">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[#0d0714]/80 backdrop-blur-md dark:bg-[#0d0714]/80 bg-white/70"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                    {/* Brand Column - Spans 4 columns */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-3 w-fit group">
                            <div className="bg-gradient-to-tr from-[#7f13ec] to-[#9f5bf5] p-2 rounded-xl shadow-[0_0_15px_rgba(127,19,236,0.5)] group-hover:scale-105 transition-transform duration-300">
                                <span className="material-symbols-outlined text-white text-[24px]">pets</span>
                            </div>
                            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white tracking-tight">
                                PawMate
                            </span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
                            The #1 platform for finding your dog's perfect partner. Safe, secure, and built with love for our furry friends.
                        </p>
                        <div className="flex gap-4 mt-2">
                            {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#7f13ec] hover:text-white dark:hover:bg-[#7f13ec] dark:hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(127,19,236,0.3)]"
                                >
                                    <i className={`fab fa-${social} text-lg`}></i>
                                    {/* Fallback if FontAwesome isn't loaded, using material icons implicitly or SVGs could be safer, but sticking to structure */}
                                    <span className="sr-only">{social}</span>
                                    {/* Using Material Symbols as fallback visual if fontawesome missing */}
                                    <span className="material-symbols-outlined text-[18px]">{social === 'facebook' ? 'public' : social === 'twitter' ? 'flutter' : social === 'instagram' ? 'photo_camera' : 'play_arrow'}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links - Spans 2 columns */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">Explore</h4>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Contact', 'Blog'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#7f13ec] dark:hover:text-[#7f13ec] text-sm font-medium transition-colors flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#7f13ec] transition-all duration-300"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal - Spans 2 columns */}
                    <div className="md:col-span-2">
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">Legal</h4>
                        <ul className="space-y-3">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Safety Tips'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#7f13ec] dark:hover:text-[#7f13ec] text-sm font-medium transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter - Spans 3 columns */}
                    <div className="md:col-span-3">
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">Stay in the Loop</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            Join our newsletter for the latest dog care tips and community events.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-4 pr-12 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-[#7f13ec] focus:ring-1 focus:ring-[#7f13ec] transition-all"
                            />
                            <button className="absolute right-1 top-1 bottom-1 aspect-square bg-[#7f13ec] hover:bg-[#6d0ecb] rounded-lg text-white flex items-center justify-center transition-colors shadow-lg shadow-purple-500/20">
                                <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-black/10 dark:border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs font-medium">
                        © {new Date().getFullYear()} PawMate Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-gray-500 text-xs font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">language</span> English (US)
                        </span>
                        <span className="text-gray-500 text-xs font-medium flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Systems Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
