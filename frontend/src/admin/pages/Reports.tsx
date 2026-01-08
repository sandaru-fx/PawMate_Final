import React from 'react';
import { motion } from 'framer-motion';

const Reports = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "backOut" } }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Header Area within Page */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8"
      >
        {/* Title & Intro */}
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight">Reports & Moderation</h2>
          <p className="text-[#ad92c9] max-w-2xl">Review user reports, manage flagged content, and maintain community safety standards.</p>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 overflow-x-auto pb-2 w-full xl:w-auto custom-scrollbar">
          {[
            { label: 'Pending', icon: 'pending_actions', value: '24', trend: '+12%', color: 'text-yellow-400', iconColor: 'text-yellow-400' },
            { label: 'Banned Today', icon: 'block', value: '5', trend: 'vs 3 yday', color: 'text-[#ad92c9]', iconColor: 'text-red-400' },
            { label: 'Response Time', icon: 'timer', value: '2m 30s', trend: '-15%', color: 'text-green-400', iconColor: 'text-blue-400' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel min-w-[160px] flex-1 xl:flex-initial rounded-xl p-4 flex flex-col gap-1 hover:border-[#7f13ec]/50 transition-colors cursor-pointer group bg-white/[0.02]">
              <div className="flex justify-between items-start">
                <p className="text-[#ad92c9] text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                <span className={`material-symbols-outlined ${stat.iconColor} text-lg group-hover:scale-110 transition-transform`}>{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              <p className={`${stat.color} text-xs font-medium flex items-center gap-1`}>
                {stat.trend}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Controls: Search & Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between glass-panel p-2 rounded-2xl bg-white/[0.02]"
      >
        {/* Search */}
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#ad92c9] group-focus-within:text-[#7f13ec] transition-colors">search</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 bg-transparent border-none text-white placeholder-[#ad92c9] focus:outline-none focus:ring-0 sm:text-sm"
            placeholder="Search by Report ID, Username, or Reason..."
            type="text"
          />
        </div>
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto px-2 pb-1 md:pb-0 custom-scrollbar">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#7f13ec] text-white rounded-lg text-sm font-medium shadow-[0_0_10px_rgba(127,19,236,0.3)] whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            All Reports
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-[#ad92c9] hover:text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            Harassment
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-[#ad92c9] hover:text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px]">person_off</span>
            Fake Profile
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-[#ad92c9] hover:text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px] text-red-400">gavel</span>
            High Severity
          </button>
        </div>
      </motion.div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto z-10 px-2 pb-6 custom-scrollbar">
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-6 top-4 bottom-0 w-0.5 bg-gradient-to-b from-[#7f13ec] via-[#4d3267] to-transparent opacity-50"
          ></motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="show">

            {/* Date Header: Today */}
            <motion.div variants={itemVariants} className="relative pl-16 mb-8">
              <div className="absolute left-0 top-1 w-12 text-right">
                <span className="text-xs font-bold text-[#7f13ec] uppercase tracking-wider">Today</span>
              </div>
              <div className="absolute left-[21px] top-1.5 size-3 bg-[#7f13ec] rounded-full shadow-[0_0_8px_2px_rgba(127,19,236,0.6)] z-10 ring-4 ring-[#191022]"></div>
            </motion.div>

            {/* Card 1: High Severity */}
            <motion.div variants={itemVariants} className="relative pl-16 mb-8 group">
              <div className="glass-panel bg-gradient-to-br from-[#362348]/60 to-[#1a1122]/60 rounded-2xl p-6 transition-all duration-300 hover:translate-x-2 hover:shadow-[0_0_20px_rgba(127,19,236,0.2)] hover:border-[#7f13ec]/40 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: User Info */}
                  <div className="shrink-0 flex md:flex-col items-center md:items-start gap-3 md:w-48 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80" alt="Dog" className="size-14 rounded-xl object-cover ring-2 ring-white/10" />
                      <div className="absolute -bottom-1 -right-1 bg-[#191022] rounded-full p-0.5">
                        <div className="bg-red-500 rounded-full p-1" title="Reported User">
                          <span className="material-symbols-outlined text-white text-[10px] block">priority_high</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base leading-tight">@GoldenBoy_99</h3>
                      <p className="text-[#ad92c9] text-xs mt-1">Reported by <span className="text-white font-medium">@LabLover</span></p>
                      <p className="text-[#ad92c9]/60 text-xs mt-0.5">10:42 AM</p>
                    </div>
                  </div>
                  {/* Right: Report Details */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                          High Severity
                        </span>
                        <span className="text-sm font-semibold text-white">Scam Activity</span>
                      </div>
                      <button className="text-[#ad92c9] hover:text-white transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      User is attempting to solicit payments for breeding services outside of the PawMate secure platform. Screenshots attached show Venmo requests.
                    </p>
                    <div className="flex gap-2 mt-1">
                      <div className="h-16 w-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors group/image">
                        <span className="material-symbols-outlined text-gray-400 group-hover/image:text-white transition-colors">image</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5">
                      <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-sm font-semibold transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">gavel</span> Ban User
                      </button>
                      <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 text-sm font-medium transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">person_remove</span> Remove Profile
                      </button>
                      <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-sm font-medium transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">warning</span> Warn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-[24px] top-8 bottom-0 w-0 border-l border-dashed border-white/10 md:hidden"></div>
              <div className="absolute left-[23px] top-8 size-2 bg-[#191022] border-2 border-[#7f13ec] rounded-full z-10"></div>
            </motion.div>

            {/* Card 2: Medium Severity */}
            <motion.div variants={itemVariants} className="relative pl-16 mb-8 group">
              <div className="glass-panel bg-gradient-to-br from-[#362348]/30 to-[#1a1122]/30 rounded-2xl p-6 transition-all duration-300 hover:translate-x-2 hover:border-[#7f13ec]/40">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="shrink-0 flex md:flex-col items-center md:items-start gap-3 md:w-48 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=150&q=80" alt="Dog" className="size-14 rounded-xl object-cover" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base leading-tight">@PugLife_Official</h3>
                      <p className="text-[#ad92c9] text-xs mt-1">Reported by <span className="text-white font-medium">@HuskyFan</span></p>
                      <p className="text-[#ad92c9]/60 text-xs mt-0.5">09:15 AM</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold uppercase tracking-wide">Medium Severity</span>
                        <span className="text-sm font-semibold text-white">Inappropriate Bio</span>
                      </div>
                      <button className="text-[#ad92c9] hover:text-white transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Profile bio contains offensive language violates community guidelines regarding respectful communication.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 pt-4 border-t border-white/5">
                      <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-[#7f13ec] hover:bg-[#5e0eb0] text-white text-sm font-semibold shadow-lg shadow-[#7f13ec]/25 transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">edit_note</span> Edit Bio
                      </button>
                      <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-sm font-medium transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">warning</span> Warn
                      </button>
                      <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg hover:bg-white/5 text-[#ad92c9] text-sm font-medium transition-all flex items-center justify-center gap-2">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-[23px] top-8 size-2 bg-[#191022] border-2 border-[#ad92c9] rounded-full z-10"></div>
            </motion.div>

            {/* Date Header: Yesterday */}
            <motion.div variants={itemVariants} className="relative pl-16 mb-8 mt-12">
              <div className="absolute left-0 top-1 w-12 text-right">
                <span className="text-xs font-bold text-[#ad92c9]/70 uppercase tracking-wider">Yday</span>
              </div>
              <div className="absolute left-[21px] top-1.5 size-3 bg-[#ad92c9]/50 rounded-full z-10 ring-4 ring-[#191022]"></div>
            </motion.div>

            {/* Card 3: Low Severity */}
            <motion.div variants={itemVariants} className="relative pl-16 mb-8 group opacity-80 hover:opacity-100 transition-opacity">
              <div className="glass-panel bg-gradient-to-br from-[#362348]/20 to-[#1a1122]/20 rounded-2xl p-6 transition-all duration-300 hover:translate-x-2">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="shrink-0 flex md:flex-col items-center md:items-start gap-3 md:w-48 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&q=80" alt="Dog" className="size-14 rounded-xl object-cover" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base leading-tight">@TankTheBulldog</h3>
                      <p className="text-[#ad92c9] text-xs mt-1">Reported by <span className="text-white font-medium">@System</span></p>
                      <p className="text-[#ad92c9]/60 text-xs mt-0.5">Yesterday, 4:20 PM</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wide">Low Severity</span>
                        <span className="text-sm font-semibold text-white">Spam Messages</span>
                      </div>
                      <button className="text-[#ad92c9] hover:text-white transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Automated system flagged repetitive messaging patterns. User sent 50 identical messages in 1 hour.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 pt-4 border-t border-white/5">
                      <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-sm font-medium transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">lock_clock</span> Timeout (24h)
                      </button>
                      <button className="flex-1 sm:flex-none h-9 px-4 rounded-lg hover:bg-white/5 text-[#ad92c9] text-sm font-medium transition-all flex items-center justify-center gap-2">
                        Ignore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-[23px] top-8 size-2 bg-[#191022] border-2 border-[#ad92c9]/50 rounded-full z-10"></div>
            </motion.div>

            {/* End of list spacer */}
            <motion.div variants={itemVariants} className="h-20 flex items-center justify-center">
              <p className="text-[#ad92c9]/40 text-sm">All caught up! No more reports.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reports;