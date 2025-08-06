import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, closeOrderModal } from '../../slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../slices/authSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    (state) => {
      console.log(
        'useSelector state.burgerConstructor:',
        state.burgerConstructor
      );
      return state.burgerConstructor;
    }
  );

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const safeConstructorItems = constructorItems ?? {
    bun: null,
    ingredients: []
  };

  const onOrderClick = () => {
    if (!safeConstructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login', { replace: true, state: { from: '/' } });
      return;
    }

    const ingredientIds = [
      safeConstructorItems.bun._id,
      ...safeConstructorItems.ingredients.map((item) => item._id),
      safeConstructorItems.bun._id
    ];
    dispatch(createOrder(ingredientIds));
  };

  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (safeConstructorItems.bun ? safeConstructorItems.bun.price * 2 : 0) +
      safeConstructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [safeConstructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={safeConstructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
