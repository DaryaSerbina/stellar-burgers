import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredientById,
  clearIngredient
} from '../../slices/ingredientDetailsSlice';

interface IngredientDetailsProps {
  isModal?: boolean;
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  isModal = false
}) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { ingredient, isLoading, error } = useSelector(
    (state) => state.ingredientDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchIngredientById(id));
    }
    return () => {
      dispatch(clearIngredient());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredient} isModal={isModal} />;
};
