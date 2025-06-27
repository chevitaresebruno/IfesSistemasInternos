import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth/UseAuth';
import PATHS from './Paths';


const AuthGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Verificando autenticação...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN.name} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;

