import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
const RequireAuth = () => {
  const { state } = useAuth();
  const route = () => {
    if (state.accessToken) {
      return <Outlet />;
    }
    return <Navigate to="/login" />;
  };

  return <>{route()}</>;
};

export default RequireAuth;
