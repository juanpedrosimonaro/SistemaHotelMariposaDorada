import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { authToken, usuarioData } = useAuth();
  //console.log("authToken: ",authToken," usuarioData: ",usuarioData)
  return  allowedRoles.includes(usuarioData.rol) ? children : <Navigate to={'/'} />
};

export default RoleBasedRoute
