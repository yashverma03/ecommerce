import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import { queryClient } from './utils/api';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
