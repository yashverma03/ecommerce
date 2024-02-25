import { lazy, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import queryClient from './config/queryClient';
import { store } from './store/store';
import PrivateRoute from './routing/PrivateRoute';
import Spinner from './components/Spinner';

const Header = lazy(async () => await import('./components/Header/Header'));
const Footer = lazy(async () => await import('./components/Footer/Footer'));
const SignUp = lazy(async () => await import('./pages/SignUp/SignUp'));
const Login = lazy(async () => await import('./pages/Login/Login'));
const Products = lazy(async () => await import('./pages/Products/Products'));
const Product = lazy(async () => await import('./pages/Product/Product'));
const Cart = lazy(async () => await import('./pages/Cart/Cart'));
const Order = lazy(async () => await import('./pages/Order/Order'));

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Header />

            <Routes>
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Products />} />
              <Route path='/product/:id' element={<Product />} />

              <Route path='/' element={<PrivateRoute />}>
                <Route path='/cart' element={<Cart />} />
                <Route path='/order' element={<Order />} />
              </Route>
            </Routes>

            <Footer />
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
