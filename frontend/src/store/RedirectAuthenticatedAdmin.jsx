// RedirectAuthenticatedAdmin.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from './FetchDataWithAxios';
import PropTypes from 'prop-types';

const RedirectAuthenticatedAdmin = ({ children }) => {
  const { isAdminAuthenticated, isAdminLoading } = useAuthStore();

  if (isAdminLoading) {
    return <div>Loading...</div>; // Anda bisa mengganti ini dengan spinner atau loading screen
  }

  if (isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

RedirectAuthenticatedAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RedirectAuthenticatedAdmin;
