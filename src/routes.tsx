import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import NewArrivals from './pages/NewArrivals';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Admin';

// BUG FIX: ждём loading=false прежде чем решать — редиректить или нет
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null; // не рендерим ничего пока Firebase не ответил

  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Catalog />} />
        <Route path="new" element={<NewArrivals />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="account" element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        } />
        <Route path="settings" element={<Settings />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        } />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
