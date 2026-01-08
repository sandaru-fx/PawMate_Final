import React, { useRef, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';

const data = [
  { name: 'Mon', users: 400, dogs: 240, matches: 240 },
  { name: 'Tue', users: 300, dogs: 139, matches: 221 },
  { name: 'Wed', users: 200, dogs: 980, matches: 229 },
  { name: 'Thu', users: 278, dogs: 390, matches: 200 },
  { name: 'Fri', users: 189, dogs: 480, matches: 218 },
  { name: 'Sat', users: 239, dogs: 380, matches: 250 },
  { name: 'Sun', users: 349, dogs: 430, matches: 210 },
];

const StatCard = ({ title, value, icon, trend, color, subValue, index }: any) => (
  <div className="stat-card glass-panel p-6 rounded-2xl relative overflow-hidden group opacity-0 translate-y-8 backdrop-blur-md border border-white/5 bg-white/5 shadow-xl hover:bg-white/10 transition-colors">
    <div className={`absolute -right-6 -top-6 size-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500`} style={{ backgroundColor: color }}></div>
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{title}</span>
        <h3 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">{value}</h3>
      </div>
      <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white shadow-inner" style={{ color: color }}>
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
    </div>
    <div className="flex items-center gap-3 relative z-10">
      <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center shadow-lg shadow-green-900/20">
        <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> {trend}
      </span>
      <span className="text-xs text-gray-500 font-medium">{subValue}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    totalDogs: 0,
    activeMatches: 0,
    revenue: 0
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const api = (await import('../services/api')).default;
        const { data } = await api.get('/admin/stats');
        setStats({
          totalUsers: data.totalUsers,
          totalDogs: data.totalDogs,
          activeMatches: data.pendingDogs,
          revenue: data.revenue
        });
      } catch (error) {
        // Fallback
        setStats({
          totalUsers: 12450,
          totalDogs: 8200,
          activeMatches: 1105,
          revenue: 42500
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger in cards
      gsap.to('.stat-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.2)'
      });

      // Charts fade in
      gsap.from('.chart-panel', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-8">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-black text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          index={0}
          title="Total Users"
          value={loading ? "..." : stats.totalUsers.toLocaleString()}
          icon="group"
          trend="+5.2%"
          color="#3b82f6" // Blue
          subValue="vs last month"
        />
        <StatCard
          index={1}
          title="Total Dogs"
          value={loading ? "..." : stats.totalDogs.toLocaleString()}
          icon="pets"
          trend="+12.5%"
          color="#a855f7" // Purple
          subValue="vs last month"
        />
        <StatCard
          index={2}
          title="Active Matches"
          value={loading ? "..." : stats.activeMatches.toLocaleString()}
          icon="favorite"
          trend="+8.1%"
          color="#f43f5e" // Rose
          subValue="curr. active"
        />
        <StatCard
          index={3}
          title="Revenue"
          value={loading ? "..." : `$${(stats.revenue / 1000).toFixed(1)}k`}
          icon="payments"
          trend="+2.4%"
          color="#10b981" // Emerald
          subValue="this month"
        />
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="chart-panel glass-panel rounded-3xl p-8 lg:col-span-2 border border-white/5 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Platform Growth</h3>
              <p className="text-sm text-gray-400">User vs Dog Registrations Trend</p>
            </div>
            <select className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl py-2 px-4 outline-none hover:bg-white/10 transition-colors cursor-pointer">
              <option className="bg-[#1a1122]">Last 7 Days</option>
              <option className="bg-[#1a1122]">Last 30 Days</option>
              <option className="bg-[#1a1122]">This Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDogs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 12, fill: '#9ca3af' }} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12, fill: '#9ca3af' }} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(26, 17, 34, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#1a1122' }} />
                <Area type="monotone" dataKey="dogs" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorDogs)" activeDot={{ r: 6, stroke: '#a855f7', strokeWidth: 2, fill: '#1a1122' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="chart-panel glass-panel rounded-3xl p-6 flex flex-col border border-white/5 bg-white/[0.02] backdrop-blur-sm relative">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-3xl"></div>
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider">View All</button>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar relative z-10">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-default">
                <div className={`shrink-0 size-10 rounded-full flex items-center justify-center shadow-lg ${i % 2 === 0 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  <span className="material-symbols-outlined text-lg">{i % 2 === 0 ? 'favorite' : 'person_add'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 truncate">
                    {i % 2 === 0
                      ? <span className="font-bold text-white">Sarah & Max</span>
                      : <span className="font-bold text-white">Mike & Rocky</span>}
                    {' '}{i % 2 === 0 ? 'found a match!' : 'registered a new account.'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">schedule</span>
                    {i * 15 + 2} mins ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
