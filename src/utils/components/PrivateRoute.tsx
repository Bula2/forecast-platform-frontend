import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: any) => {
  const isAuth = true;
  if (!isAuth) {
    return <Navigate to={'/login'}></Navigate>;
  }
  return <>{children}</>;
};
