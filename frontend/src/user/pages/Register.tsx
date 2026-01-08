import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, PawPrint, AlertCircle, Loader2 } from 'lucide-react';
import api from '../../admin/services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validateForm = () => {
    const errors: { name?: string; email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      errors.name = 'Full Name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      });

      const { token, user } = response.data;
      
      login(token, user);
      navigate('/home');
      
    } catch (err: any) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0f0f13] text-white overflow-hidden">
      {/* Left Side: Immersive Image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative hidden lg:flex w-full lg:w-1/2 items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105" 
          style={{backgroundImage: 'url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop")'}}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent"></div>
        
        <div className="relative z-10 p-16 max-w-xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 backdrop-blur-md rounded-2xl border border-primary/30">
                <PawPrint className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-wider text-primary uppercase">PawMate</span>
            </div>
            <h1 className="text-5xl font-black leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Join the Pack.
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Start your journey today. Find playdates, share moments, and connect with a community that loves dogs as much as you do.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side: Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-[#0f0f13] to-[#0f0f13] pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[440px] flex flex-col gap-8 relative z-20"
        >
           {/* Mobile Logo */}
           <Link to="/" className="lg:hidden flex items-center gap-2 mb-4 self-center">
            <PawPrint className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">PawMate</span>
          </Link>

          <div>
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-400">Sign up to get started with PawMate.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors ${fieldErrors.name ? 'text-red-500' : 'text-gray-500 group-focus-within:text-primary'}`} />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-all ${
                    fieldErrors.name 
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' 
                      : 'border-white/10 focus:border-primary/50 focus:ring-primary/50'
                  }`}
                  placeholder="e.g. Charlie Brown" 
                />
              </div>
              {fieldErrors.name && (
                <p className="text-xs text-red-400 ml-1">{fieldErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors ${fieldErrors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-primary'}`} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-all ${
                    fieldErrors.email 
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' 
                      : 'border-white/10 focus:border-primary/50 focus:ring-primary/50'
                  }`}
                  placeholder="name@example.com" 
                />
              </div>
              {fieldErrors.email && (
                <p className="text-xs text-red-400 ml-1">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${fieldErrors.password ? 'text-red-500' : 'text-gray-500 group-focus-within:text-primary'}`} />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-all ${
                    fieldErrors.password 
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' 
                      : 'border-white/10 focus:border-primary/50 focus:ring-primary/50'
                  }`}
                  placeholder="Create a strong password" 
                />
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-red-400 ml-1">{fieldErrors.password}</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 h-14 bg-primary hover:bg-primary-hover text-[#1b140d] font-bold text-base rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <img src="https://www.svgrepo.com/show/448234/apple.svg" alt="Apple" className="w-5 h-5 invert" />
              <span className="text-sm font-medium">Apple</span>
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account? 
            <Link to="/login" className="text-primary font-bold hover:underline ml-1">Log In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;