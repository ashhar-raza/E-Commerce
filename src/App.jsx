import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './components/Home';
import Login from './components/Login';
import Cart from './components/Cart';
import SignUp from './components/SignUp';
import User from './components/User';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/:name' element={<User />} />
      </Routes>
    </Layout>
  );
}

export default App;
