import ingredientDetailsReducer, {
  fetchIngredientById,
  clearIngredient
} from '../../slices/ingredientDetailsSlice';
import { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
};

describe('проверка редьюсера ingredientDetailsSlice', () => {
  const initialState = {
    ingredient: null,
    isLoading: false,
    error: null
  };

  it('проверка обработки экшена clearIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredient: mockIngredient
    };

    const action = clearIngredient();
    const state = ingredientDetailsReducer(stateWithIngredient, action);

    expect(state.ingredient).toBeNull();
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена fetchIngredientById.pending', () => {
    const action = { type: fetchIngredientById.pending.type };
    const state = ingredientDetailsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена fetchIngredientById.fulfilled', () => {
    const action = {
      type: fetchIngredientById.fulfilled.type,
      payload: mockIngredient
    };
    const state = ingredientDetailsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredient).toEqual(mockIngredient);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена fetchIngredientById.rejected', () => {
    const errorMessage = 'Ingredient not found';
    const action = {
      type: fetchIngredientById.rejected.type,
      payload: errorMessage
    };
    const state = ingredientDetailsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredient).toBeNull();
    expect(state.error).toBe(errorMessage);
  });
});
