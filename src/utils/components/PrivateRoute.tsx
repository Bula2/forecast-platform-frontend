import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const PrivateRoute = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  const isAuth = !!user;
  // if (!isAuth) {
  //   return <Navigate to={'/login'}></Navigate>;
  // }
  return <>{children}</>;
};
