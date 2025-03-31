// react
import React, { useState, useEffect } from 'react';

// router
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.userData.userData);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  if (loading) {
    return <div style={{ width: '100vw', height: '100vh', background: '#fff' }} />;
  }

  if (isAuthenticated === false && pathname !== '/') {
    return navigate('/', { replace: true }), null;
  }

  if (isAuthenticated === true && pathname === '/') {
    return navigate('/home', { replace: true }), null;
  }

  return children;
};
