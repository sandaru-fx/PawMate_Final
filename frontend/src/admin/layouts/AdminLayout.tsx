import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#7f13ec]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-y-auto p-6 md:p-8 z-10 custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
