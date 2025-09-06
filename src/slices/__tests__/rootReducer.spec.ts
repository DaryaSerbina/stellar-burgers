import store from '../../services/store';

describe('проверка инизиацлизации rootReducer', () => {
  it('возвращает исходное состояние с правильной структурой', () => {
    const initialState = store.getState();
    expect(initialState).toEqual({
      ingredients: expect.any(Object),
      burgerConstructor: expect.any(Object),
      feed: expect.any(Object),
      ingredientDetails: expect.any(Object),
      profile: expect.any(Object),
      profileOrders: expect.any(Object),
      auth: expect.any(Object)
    });
  });
});
