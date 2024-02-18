import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import queryClient from './utils/queryClient';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Header from './helpers/Header/Header';
import Footer from './helpers/Footer/Footer';
import { store } from './utils/store/store';
import PrivateRoute from './helpers/PrivateRoute';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';

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
            </Route>
          </Routes>

          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
