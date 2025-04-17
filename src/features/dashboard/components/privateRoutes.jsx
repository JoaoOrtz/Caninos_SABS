// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('Token');

  return token && token !== "null" && token !== ""
    ? children
    : <Navigate to="/login" replace />;
};
