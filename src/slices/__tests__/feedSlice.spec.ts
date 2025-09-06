import feedReducer, { fetchFeed } from '../../slices/feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Space burger',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941']
  }
];

const mockFeedData = {
  orders: mockOrders,
  total: 100,
  totalToday: 10
};

describe('проверка редьюсера feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  it('проверка обработки экшена fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена fetchFeed.fulfilled', () => {
    const action = {
      type: fetchFeed.fulfilled.type,
      payload: mockFeedData
    };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена fetchFeed.rejected', () => {
    const errorMessage = 'Network error';
    const action = {
      type: fetchFeed.rejected.type,
      payload: errorMessage
    };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.error).toBe(errorMessage);
  });
});
