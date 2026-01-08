import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
    // Initialize state based on localStorage or system preference
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="relative flex items-center justify-center size-10 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 group bg-surface-light dark:bg-[#3e342a] border border-border dark:border-[#524538]"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            <span className={`material-symbols-outlined transition-all duration-300 absolute ${isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100 text-amber-500'}`}>
                light_mode
            </span>
            <span className={`material-symbols-outlined transition-all duration-300 absolute ${isDark ? 'scale-100 rotate-0 opacity-100 text-blue-400' : 'scale-0 -rotate-90 opacity-0'}`}>
                dark_mode
            </span>
        </button>
    );
};

export default ThemeToggle;
