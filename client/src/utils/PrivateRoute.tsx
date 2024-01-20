import { Navigate, Outlet } from 'react-router-dom';
import { getFromLocalStorage } from './localStorageApi';

const PrivateRoute = () => {
  const token = getFromLocalStorage('user').token;
  return token !== null ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
