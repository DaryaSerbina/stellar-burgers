import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
  useParams
} from 'react-router-dom';
import {
  Modal,
  OrderInfo,
  IngredientDetails,
  AppHeader,
  OrderCard
} from '@components';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { getCookie } from '../../utils/cookie';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getUserThunk } from '../../slices/authSlice';
import { FC } from 'react';
import { fetchIngredients } from '../../slices/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (document.cookie.includes('accessToken')) {
      dispatch(getUserThunk());
    }
    dispatch(fetchIngredients());
  }, [dispatch]);
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  const isAuthenticated = () => !!getCookie('accessToken');
  const handleModalClose = () => {
    navigate(-1);
  };
  const FeedOrderModal: FC = () => {
    const { number } = useParams<{ number: string }>();
    const title = number ? `#${number.padStart(6, '0')}` : '#';
    return (
      <Modal title={title} onClose={handleModalClose}>
        <OrderInfo />
      </Modal>
    );
  };
  const ProfileOrderModal: FC = () => {
    const { number } = useParams<{ number: string }>();
    const title = number ? `#${number.padStart(6, '0')}` : '#';
    return (
      <Modal title={title} onClose={handleModalClose}>
        <OrderInfo />
      </Modal>
    );
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            isAuthenticated() ? <Navigate to='/profile' replace /> : <Login />
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute element={<OrderInfo />} />}
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path='/feed/:number' element={<FeedOrderModal />} />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails isModal />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={<ProtectedRoute element={<ProfileOrderModal />} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
