import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi, updateUserApi } from '../utils/burger-api';

interface User {
  name: string;
  email: string;
}

interface ProfileForm {
  name: string;
  email: string;
  password: string;
}

interface ProfileState {
  user: User | null;
  formValue: ProfileForm;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  formValue: {
    name: '',
    email: '',
    password: ''
  },
  isLoading: false,
  error: null
};

export const fetchUser = createAsyncThunk(
  'profile/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Не удалось загрузить данные пользователя'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (data: ProfileForm, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Не удалось обновить профиль');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFormValue: (state, action: { payload: Partial<ProfileForm> }) => {
      state.formValue = { ...state.formValue, ...action.payload };
    },
    resetForm: (state) => {
      state.formValue = {
        name: state.user?.name || '',
        email: state.user?.email || '',
        password: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.formValue = {
          name: action.payload.name,
          email: action.payload.email,
          password: ''
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.formValue = {
          name: action.payload.name,
          email: action.payload.email,
          password: ''
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setFormValue, resetForm } = profileSlice.actions;

export default profileSlice.reducer;
