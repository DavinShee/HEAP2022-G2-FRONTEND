// https://stackoverflow.com/questions/66289122/how-to-create-a-protected-route

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
