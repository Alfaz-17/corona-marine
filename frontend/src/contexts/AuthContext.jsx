import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth();
  }, []);
const checkAuth = async () => {
  try {
    console.log(user);
    const response = await api.post('/auth/me');
    setUser(response.data);
     // Axios puts JSON in .data
  } catch (error) {
    console.log('Backend server not available - running in demo mode', error);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

const login = async (email, password) => {
  try {
  const response = await api.post('/auth/login', { email, password });

localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify(response.data.user));

setUser(response.data.user);

return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed' 
    };
  }
};


  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      setMessage({ type: 'success', text: 'Successfully logged out' });
    } catch (error) {
      console.log('Backend server not available - running in demo mode');
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};