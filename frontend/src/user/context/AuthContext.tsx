import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, UserRole } from '../types';

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes if localStorage is empty
const MOCK_USER: User = {
  _id: '1',
  name: 'Sarah',
  email: 'sarah@pawmate.com',
  role: UserRole.USER,
  profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhF6z_7qzkCf4cmonPHxgMTqadbnZm55INMLJB9orXHw390iWszh6LvKRwdvEU6DlMgN9jE18mGqEna9LB3L1masYr1n9gpe0t5bRkBIYmBlI0WzlhfsqiRXk0IpK4b5mfRFeV0f1BGp-FBeBMAES8t1Wy2gR9lL5XM_BRpbznJ823y-H3ZeL_O1S-XnazaOn33miGIMmm-r7JIxCyo5BJhR9w42GHuy5_N9ZfA8bxhZk8-B6O_P3oP-iiCgDNPmcg6xuCCOZMVJo'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // In a real app, validate token with backend here
    const token = localStorage.getItem('pawmate_token');
    const userStr = localStorage.getItem('pawmate_user');
    
    if (token && userStr) {
      setState({
        token,
        user: JSON.parse(userStr),
        isAuthenticated: true
      });
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('pawmate_token', token);
    localStorage.setItem('pawmate_user', JSON.stringify(user));
    setState({ token, user, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('pawmate_token');
    localStorage.removeItem('pawmate_user');
    setState({ token: null, user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};