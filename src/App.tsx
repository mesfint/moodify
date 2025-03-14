import { Route, Routes } from 'react-router-dom';
import Callback from './component/Callback';
import Favourite from './component/Favourite';
import Toast from './component/Toast';
import Home from './pages/Home';
import Layout from './pages/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
      <Toast />
    </Layout>
  );
};

export default App;
