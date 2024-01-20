import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { queryClient } from './utils/api';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { store } from './utils/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Header />
                  <Outlet />
                  <Footer />
                </>
              }
            >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
