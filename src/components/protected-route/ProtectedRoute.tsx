import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

interface ProtectedRouteProps {
  element: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = !!getCookie('accessToken');
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return element;
};
