import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

interface IngredientDetailsState {
  ingredient: TIngredient | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientDetailsState = {
  ingredient: null,
  isLoading: false,
  error: null
};

export const fetchIngredientById = createAsyncThunk(
  'ingredientDetails/fetchIngredientById',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as {
        ingredients: { ingredients: TIngredient[] };
      };
      const existingIngredient = state.ingredients.ingredients.find(
        (item) => item._id === id
      );

      if (existingIngredient) {
        return existingIngredient;
      }

      const data = await getIngredientsApi();
      const ingredient = data.find((item: TIngredient) => item._id === id);

      if (!ingredient) {
        throw new Error('Ингредиент не найден');
      }

      return ingredient;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Не удалось загрузить данные об ингредиенте'
      );
    }
  }
);

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    clearIngredient: (state) => {
      state.ingredient = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredientById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredient = action.payload;
      })
      .addCase(fetchIngredientById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearIngredient } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
