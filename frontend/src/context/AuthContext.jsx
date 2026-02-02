import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on app load
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // MOCK AUTH - Demo users (no backend needed)
    const demoUsers = {
      'demo@ayurveda.com': { name: 'Demo User', email: 'demo@ayurveda.com' },
      'admin@ayurveda.com': { name: 'Admin User', email: 'admin@ayurveda.com' }
    };

    if (demoUsers[email] && password === '123456') {
      const userData = demoUsers[email];
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      setUser(userData);
      setToken(mockToken);
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
