import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../../slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';

const mockBun: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  id: ''
};

const mockIngredient: TConstructorIngredient = {
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
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  id: ''
};

describe('проверка редьюсера constructorSlice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  it('проверка обработки экшена добавления булочки', () => {
    const action = addBun(mockBun);
    const state = constructorReducer(initialState, action);

    expect(state.constructorItems.bun).toEqual({
      ...mockBun,
      id: expect.any(String)
    });
  });

  it('проверка обработки экшена добавления ингредиента', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual({
      ...mockIngredient,
      id: expect.any(String)
    });
  });

  it('проверка обработки экшена удаления ингредиента', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [mockIngredient]
      }
    };

    const action = removeIngredient(mockIngredient.id);
    const state = constructorReducer(stateWithIngredient, action);

    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('проверка экшена изменения порядка ингредиентов в начинке', () => {
    const ingredients = [
      { ...mockIngredient, id: '1' },
      { ...mockIngredient, id: '2' },
      { ...mockIngredient, id: '3' }
    ];

    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients
      }
    };

    const action = moveIngredient({ fromIndex: 0, toIndex: 2 });
    const state = constructorReducer(stateWithIngredients, action);

    expect(state.constructorItems.ingredients[0].id).toBe('2');
    expect(state.constructorItems.ingredients[2].id).toBe('1');
  });
});
