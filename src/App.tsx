import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import Callback from './component/Callback';
import SpotifyAuth from './component/SpotifyAuth';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpotifyAuth />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
};

export default App;
