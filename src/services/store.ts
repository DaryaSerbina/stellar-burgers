import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import feedReducer from '../slices/feedSlice';
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice';
import profileReducer from '../slices/profileSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice';
import authReducer from '../slices/authSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  ingredientDetails: ingredientDetailsReducer,
  profile: profileReducer,
  profileOrders: profileOrdersReducer,
  auth: authReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
