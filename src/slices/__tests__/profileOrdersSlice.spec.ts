import profileOrdersReducer, {
  fetchUserOrders,
  clearOrders
} from '../../slices/profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'My order',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941']
  }
];

describe('проверка редьюсера profileOrdersSlice', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  };

  it('проверка обработки экшена clearOrders', () => {
    const stateWithOrders = {
      ...initialState,
      orders: mockOrders,
      error: 'Some error'
    };

    const action = clearOrders();
    const state = profileOrdersReducer(stateWithOrders, action);

    expect(state.orders).toEqual([]);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена fetchUserOrders.fulfilled', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = profileOrdersReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена fetchUserOrders.rejected', () => {
    const errorMessage = 'Failed to fetch orders';
    const action = {
      type: fetchUserOrders.rejected.type,
      payload: errorMessage
    };
    const state = profileOrdersReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.error).toBe(errorMessage);
  });
});
