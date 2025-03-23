import { Route, Routes } from 'react-router-dom';
import Callback from './component/Callback';
import CurrentSong from './component/CurrentSong';
import Favourite from './component/Favourite';
import Playlists from './component/Playlists';
import Toast from './component/Toast';
import Home from './pages/Home';
import Layout from './pages/Layout';

const App = () => {
  return (
    <Layout>
      <Toast />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:playlistId" element={<Playlists />} />
        <Route path="/songs/:id" element={<CurrentSong />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Layout>
  );
};

export default App;
