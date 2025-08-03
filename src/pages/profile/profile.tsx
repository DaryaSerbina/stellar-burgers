import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  fetchUser,
  updateUser,
  setFormValue,
  resetForm
} from '../../slices/profileSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, formValue, isLoading, error } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetForm());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormValue({ [e.target.name]: e.target.value }));
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
