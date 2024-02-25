import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import queryClient from './config/queryClient';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { store } from './store/store';
import PrivateRoute from './routing/PrivateRoute';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
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
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
