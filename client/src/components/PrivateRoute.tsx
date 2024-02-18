import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { verfiyUser } from '../services/api';
import { removeUser } from '../store/reducers/user';

const PrivateRoute = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['private-route'],
    queryFn: verfiyUser
  });

  if (isLoading) {
    return null;
  }

  if (data === false || (isSuccess && data === undefined)) {
    dispatch(removeUser());
    localStorage.removeItem('user');
    window.location.href = '/login';
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
