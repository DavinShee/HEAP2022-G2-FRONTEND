// https://stackoverflow.com/questions/66289122/how-to-create-a-protected-route

import { useState, useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  const loading = <></>;

  const loaded = user ? <Outlet /> : <Navigate to="/" replace />;

  return render ? loaded : loading;
};

export default PrivateRoutes;
