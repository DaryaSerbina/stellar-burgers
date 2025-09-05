import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { useDispatch } from 'react-redux';
import { TBurgerIngredientProps } from './type';
import { addBun, addIngredient } from '../../slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addBun({ ...ingredient, id: ingredient._id }));
      } else {
        dispatch(addIngredient({ ...ingredient, id: ingredient._id }));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
