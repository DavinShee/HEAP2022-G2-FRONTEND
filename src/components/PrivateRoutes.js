import { useState, useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);
  const [render, setRender] = useState(false);

  // Prevent redirect when user directly inputs URL, only redirects after the value of user is confirmed.
  useEffect(() => {
    setRender(true);
  }, []);

  const loading = <></>;

  const loaded = user ? <Outlet /> : <Navigate to="/" replace />;

  return render ? loaded : loading;
};

export default PrivateRoutes;
