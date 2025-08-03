import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, closeOrderModal } from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    (state) => {
      console.log(
        'useSelector state.burgerConstructor:',
        state.burgerConstructor
      );
      return state.burgerConstructor;
    }
  );

  const safeConstructorItems = constructorItems ?? {
    bun: null,
    ingredients: []
  };

  const onOrderClick = () => {
    if (!safeConstructorItems.bun || orderRequest) return;

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
