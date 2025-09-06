import profileReducer, {
  fetchUser,
  updateUser,
  setFormValue,
  resetForm
} from '../../slices/profileSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('проверка редьюсера profileSlice', () => {
  const initialState = {
    user: null,
    formValue: {
      name: '',
      email: '',
      password: ''
    },
    isLoading: false,
    error: null
  };

  it('проверка обработки экшена setFormValue', () => {
    const newValues = { name: 'New Name', email: 'new@example.com' };
    const action = setFormValue(newValues);
    const state = profileReducer(initialState, action);

    expect(state.formValue.name).toBe('New Name');
    expect(state.formValue.email).toBe('new@example.com');
    expect(state.formValue.password).toBe('');
  });

  it('проверка обработки экшена resetForm', () => {
    const stateWithData = {
      ...initialState,
      user: mockUser,
      formValue: {
        name: 'Old Name',
        email: 'old@example.com',
        password: '123456'
      }
    };

    const action = resetForm();
    const state = profileReducer(stateWithData, action);

    expect(state.formValue.name).toBe('Test User');
    expect(state.formValue.email).toBe('test@example.com');
    expect(state.formValue.password).toBe('');
  });

  it('проверка обработки экшена fetchUser.pending', () => {
    const action = { type: fetchUser.pending.type };
    const state = profileReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена fetchUser.fulfilled', () => {
    const action = {
      type: fetchUser.fulfilled.type,
      payload: mockUser
    };
    const state = profileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.formValue.name).toBe('Test User');
    expect(state.formValue.email).toBe('test@example.com');
    expect(state.formValue.password).toBe('');
    expect(state.error).toBeNull();
  });

  it('проверка обработки экшена updateUser.rejected', () => {
    const errorMessage = 'Update failed';
    const action = {
      type: updateUser.rejected.type,
      payload: errorMessage
    };
    const state = profileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
