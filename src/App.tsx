import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Callback from './component/Callback';
import Categories from './component/Categories';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import { fetchProfile, initiateLogin } from './services/auth-service';
import { UserProfile } from './types/spotify';

const App = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('code_verifier');
    setAccessToken(null);
    setProfile(null);
  };
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);

      // Fetch the profile data and update the state
      const fetchAndSetProfile = async () => {
        try {
          const profileData = await fetchProfile(token);
          setProfile(profileData);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchAndSetProfile();
    }
  }, []);
  return (
    <div className="min-h-screen flex bg-secondary-dark text-secondary-text-light">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-4">
        <Header
          onLogOut={handleLogout}
          accessToken={accessToken}
          profile={profile}
          onLogin={initiateLogin}
        />
        <Categories />
      </div>

      <Routes>
        <Route path="/callback" element={<Callback />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </div>
  );
};

export default App;
