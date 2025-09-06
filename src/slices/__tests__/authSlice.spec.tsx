import authReducer, {
  loginThunk,
  registerThunk,
  getUserThunk,
  logoutThunk,
  clearError,
  updateUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk
} from '../../slices/authSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('проверка редьюсера authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };

  it('проверка обработки экшена clearError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Some error'
    };

    const action = clearError();
    const state = authReducer(stateWithError, action);

    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена loginThunk.pending', () => {
    const action = { type: loginThunk.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена loginThunk.fulfilled', () => {
    const action = {
      type: loginThunk.fulfilled.type,
      payload: mockUser
    };
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена loginThunk.rejected', () => {
    const errorMessage = 'Login failed';
    const action = {
      type: loginThunk.rejected.type,
      payload: errorMessage
    };
    const state = authReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('проверка обработки экшена registerThunk.pending', () => {
    const action = { type: registerThunk.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена registerThunk.fulfilled', () => {
    const action = {
      type: registerThunk.fulfilled.type,
      payload: mockUser
    };
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена registerThunk.rejected', () => {
    const errorMessage = 'Register failed';
    const action = {
      type: registerThunk.rejected.type,
      payload: errorMessage
    };
    const state = authReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('проверка обработки экшена getUserThunk.pending', () => {
    const action = { type: getUserThunk.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена getUserThunk.fulfilled', () => {
    const action = {
      type: getUserThunk.fulfilled.type,
      payload: mockUser
    };
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена getUserThunk.rejected', () => {
    const errorMessage = 'No access token';
    const action = {
      type: getUserThunk.rejected.type,
      payload: errorMessage
    };
    const state = authReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('проверка обработки экшена updateUserThunk.pending', () => {
    const action = { type: updateUserThunk.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена updateUserThunk.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'Updated User' };
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: updatedUser
    };
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(updatedUser);
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена updateUserThunk.rejected', () => {
    const errorMessage = 'Update failed';
    const action = {
      type: updateUserThunk.rejected.type,
      payload: errorMessage
    };
    const state = authReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('проверка обработки экшена logoutThunk.pending', () => {
    const action = { type: logoutThunk.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена logoutThunk.fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      isAuthenticated: true
    };

    const action = { type: logoutThunk.fulfilled.type };
    const state = authReducer(stateWithUser, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена logoutThunk.rejected', () => {
    const errorMessage = 'Logout failed';
    const action = {
      type: logoutThunk.rejected.type,
      payload: errorMessage
    };
    const state = authReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('проверка обработки экшена forgotPasswordThunk.pending', () => {
    const action = { type: forgotPasswordThunk.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена forgotPasswordThunk.fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      isAuthenticated: true
    };
    const action = { type: forgotPasswordThunk.fulfilled.type };
    const state = authReducer(stateWithUser, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена forgotPasswordThunk.rejected', () => {
    const errorMessage = 'Forgot password failed';
    const action = {
      type: forgotPasswordThunk.rejected.type,
      payload: errorMessage
    };
    const state = authReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('проверка обработки экшена resetPasswordThunk.pending', () => {
    const action = { type: resetPasswordThunk.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена resetPasswordThunk.fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      isAuthenticated: true
    };
    const action = { type: resetPasswordThunk.fulfilled.type };
    const state = authReducer(stateWithUser, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена resetPasswordThunk.rejected', () => {
    const errorMessage = 'Reset password failed';
    const action = {
      type: resetPasswordThunk.rejected.type,
      payload: errorMessage
    };
    const state = authReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
