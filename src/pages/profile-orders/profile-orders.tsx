import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchUserOrders } from '../../slices/profileOrdersSlice';
import { getCookie } from '../../utils/cookie';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(
    (state) => state.profileOrders
  );
  const isAuthenticated = !!getCookie('accessToken');

  useEffect(() => {
    if (isAuthenticated && !isLoading && orders.length === 0) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, isAuthenticated, isLoading, orders.length]);

  if (!isAuthenticated) {
    return <div>Пожалуйста, авторизуйтесь для просмотра заказов</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
