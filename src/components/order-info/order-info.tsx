import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeed } from '../../slices/feedSlice';
import { fetchUserOrders } from '../../slices/profileOrdersSlice';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { useParams, useLocation } from 'react-router-dom';
import { NotFound404 } from '@pages';
import { TOrderInfo } from '../ui/order-info/type';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const isProfileOrder = location.pathname.includes('/profile/orders');
  const feedOrders = useSelector((state) => state.feed.orders);
  const userOrders = useSelector((state) => state.profileOrders.orders);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isLoading = useSelector(
    (state) =>
      state.feed.isLoading ||
      state.profileOrders.isLoading ||
      state.ingredients.isLoading
  );
  const error = useSelector(
    (state) =>
      state.feed.error || state.profileOrders.error || state.ingredients.error
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }

    if (isProfileOrder && !userOrders.length) {
      dispatch(fetchUserOrders());
    } else if (!isProfileOrder && !feedOrders.length) {
      dispatch(fetchFeed());
    }
  }, [dispatch, feedOrders, userOrders, ingredients, isProfileOrder]);

  const orderData = useMemo(() => {
    const orders = isProfileOrder ? userOrders : feedOrders;
    return orders.find((order) => order.number === Number(number));
  }, [feedOrders, userOrders, number, isProfileOrder]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return undefined;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!orderData) {
    return <NotFound404 />;
  }

  return <OrderInfoUI orderInfo={orderInfo as TOrderInfo} />;
};
