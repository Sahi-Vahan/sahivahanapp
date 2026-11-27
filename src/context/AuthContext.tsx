import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  adminUser: User | null;
  isUserAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  loginUser: (email: string, fullName?: string, phone?: string) => Promise<User>;
  registerUser: (email: string, fullName: string, phone: string) => Promise<User>;
  loginAdmin: (email: string, password?: string) => Promise<User>;
  logoutUser: () => void;
  logoutAdmin: () => void;
  switchDemoUser: (role: UserRole) => void;
}

const DEFAULT_ADMIN: User = {
  id: 'adm-001',
  email: 'admin@sahivahan.com',
  fullName: 'SahiVahan Operations Admin',
  phone: '+91 99999 00001',
  role: 'admin',
  createdAt: '2026-01-01T00:00:00Z'
};

const DEFAULT_USER: User = {
  id: 'usr-demo-1',
  email: 'rahul.verma@gmail.com',
  fullName: 'Rahul Verma',
  phone: '+91 98765 43210',
  role: 'user',
  createdAt: '2026-10-01T00:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('sv_active_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('sv_active_admin');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sv_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sv_active_user');
    }
  }, [user]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('sv_active_admin', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('sv_active_admin');
    }
  }, [adminUser]);

  const loginUser = async (email: string, fullName?: string, phone?: string): Promise<User> => {
    const existingUsersStr = localStorage.getItem('sv_registered_users');
    const existingUsers: User[] = existingUsersStr ? JSON.parse(existingUsersStr) : [];
    
    let matched = existingUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!matched) {
      matched = {
        id: `usr-${Date.now().toString(36)}`,
        email,
        fullName: fullName || email.split('@')[0],
        phone: phone || '',
        role: 'user',
        createdAt: new Date().toISOString()
      };
      existingUsers.push(matched);
      localStorage.setItem('sv_registered_users', JSON.stringify(existingUsers));
    }

    setUser(matched);
    return matched;
  };

  const registerUser = async (email: string, fullName: string, phone: string): Promise<User> => {
    return loginUser(email, fullName, phone);
  };

  const loginAdmin = async (email: string, _password?: string): Promise<User> => {
    // For admin portal authentication
    const admin: User = {
      ...DEFAULT_ADMIN,
      email: email || DEFAULT_ADMIN.email
    };
    setAdminUser(admin);
    return admin;
  };

  const logoutUser = () => {
    setUser(null);
  };

  const logoutAdmin = () => {
    setAdminUser(null);
  };

  const switchDemoUser = (role: UserRole) => {
    if (role === 'admin') {
      setAdminUser(DEFAULT_ADMIN);
    } else {
      setUser(DEFAULT_USER);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        adminUser,
        isUserAuthenticated: !!user,
        isAdminAuthenticated: !!adminUser,
        loginUser,
        registerUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
        switchDemoUser
      }}
    >
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

