import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Load from API on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/admin/profile');
        setFormData(prev => ({
          ...prev,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || ''
        }));
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };
      if (formData.password) {
        updateData.password = formData.password;
      }

      const { data } = await api.put('/admin/profile', updateData);

      // Dispatch custom event to update Sidebar
      window.dispatchEvent(new Event('adminProfileUpdate'));

      setLoading(false);
      setSuccessMsg('Changes saved successfully!');

      // Clear password fields
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));

      // Clear success message after 3s
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      console.error(err);
      const backendError = err.response?.data?.message || err.response?.data?.error || 'Failed to save changes. Please try again.';
      setErrorMsg(backendError);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="glass-panel rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7f13ec]/20 rounded-full blur-[80px] group-hover:bg-[#7f13ec]/30 transition-all duration-700 pointer-events-none"></div>

        <div className="relative shrink-0">
          <div className="size-24 md:size-32 rounded-full border-4 border-[#191022] shadow-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=admin_alex")' }}></div>
          <button className="absolute bottom-0 right-0 p-2 bg-[#7f13ec] hover:bg-[#6d0ecb] text-white rounded-full shadow-lg border-2 border-[#191022] transition-transform hover:scale-105">
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </button>
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <h2 className="text-3xl font-bold text-white mb-1">{formData.name || 'Loading...'}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#7f13ec]/20 text-white text-xs font-bold border border-[#7f13ec]/20">Super Admin</span>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Active
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-xl mx-auto md:mx-0">
            Manage your account settings and preferences. As a Super Admin, you have full access to all partner and dog records.
          </p>
        </div>

        <div className="flex flex-col gap-3 min-w-[140px] z-10 w-full md:w-auto">
          <div className="bg-[#191022]/50 p-3 rounded-xl border border-white/5 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Admin ID</p>
            <p className="text-white font-mono font-medium">#99281-AM</p>
          </div>
          <div className="bg-[#191022]/50 p-3 rounded-xl border border-white/5 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Joined</p>
            <p className="text-white font-medium">Oct 2023</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'general', icon: 'person', label: 'General' },
            { id: 'security', icon: 'lock', label: 'Security' },
            { id: 'notifications', icon: 'notifications', label: 'Notifications' },
            { id: 'preferences', icon: 'tune', label: 'Preferences' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w - full text - left px - 4 py - 3 rounded - xl font - medium flex items - center justify - between transition - all ${activeTab === tab.id
                ? 'bg-[#7f13ec] text-white shadow-lg shadow-[#7f13ec]/25'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                } `}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              {activeTab === tab.id && <span className="material-symbols-outlined text-sm">chevron_right</span>}
            </button>
          ))}
        </div>

        {/* Main Content Form */}
        <div className="lg:col-span-3 space-y-6">
          {successMsg && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
              <span className="material-symbols-outlined">check_circle</span>
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
              <span className="material-symbols-outlined">error</span>
              {errorMsg}
            </div>
          )}

          {activeTab === 'general' && (
            <div className="glass-panel rounded-2xl p-6 md:p-8 animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-lg font-bold">Personal Information</h3>
                <button className="text-sm text-[#7f13ec] hover:text-white transition-colors">Edit Details</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#191022] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7f13ec] focus:ring-1 focus:ring-[#7f13ec] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">mail</span>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#191022] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#7f13ec] focus:ring-1 focus:ring-[#7f13ec] transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">call</span>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#191022] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#7f13ec] focus:ring-1 focus:ring-[#7f13ec] transition-all" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-panel rounded-2xl p-6 md:p-8 animate-fadeIn">
              <h3 className="text-white text-lg font-bold mb-6">Security & Password</h3>
              <div className="space-y-4 mb-8">
                {/* <div className="space-y-2">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-1">Current Password</label>
                    <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} className="w-full bg-[#191022] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7f13ec] transition-all"/>
                 </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-1">New Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter new password" className="w-full bg-[#191022] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7f13ec] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-1">Confirm New Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm new password" className="w-full bg-[#191022] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7f13ec] transition-all" />
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium mb-1">Two-Factor Authentication (2FA)</p>
                    <p className="text-gray-400 text-sm">Add an extra layer of security to your account.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7f13ec]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-panel rounded-2xl p-6 md:p-8 animate-fadeIn">
              <h3 className="text-white text-lg font-bold mb-6">Notifications</h3>
              <div className="space-y-6">
                {[
                  { title: 'New Dog Registrations', desc: 'Get notified when a new dog profile is created.', icon: 'pets', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { title: 'User Reports', desc: 'Receive alerts for reported content or users.', icon: 'report_problem', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { title: 'Marketing Updates', desc: 'News about PawMate features and updates.', icon: 'campaign', color: 'text-purple-500', bg: 'bg-purple-500/10' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="flex gap-4">
                      <div className={`size - 10 rounded - full flex items - center justify - center ${item.bg} ${item.color} `}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.title}</p>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7f13ec]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="glass-panel rounded-2xl p-6 md:p-8 animate-fadeIn">
              <h3 className="text-white text-lg font-bold mb-6">Platform Preferences</h3>
              <div className="space-y-6">
                {[
                  { title: 'Maintenance Mode', desc: 'Take the site offline for everyone except admins.', icon: 'build' },
                  { title: 'Auto-Approve Dogs', desc: 'Skip manual verification for new dog profiles.', icon: 'verified' },
                  { title: 'Public Registration', desc: 'Allow new users to sign up.', icon: 'how_to_reg' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.title}</p>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7f13ec]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Actions */}
          <div className="flex items-center justify-end gap-4 pt-2">
            <button className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium">Cancel</button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-[#7f13ec] hover:bg-[#6d0ecb] text-white shadow-lg shadow-[#7f13ec]/30 transition-all font-bold tracking-wide transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;