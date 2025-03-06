import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Callback from './component/Callback';
import Header from './component/Header';
import Home from './component/Home';
import { fetchProfile, initiateLogin } from './services/auth-service';
import { UserProfile } from './types/spotify';

const App = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Clear the access token
    localStorage.removeItem('code_verifier'); // Clear the code verifier
    setAccessToken(null); // Reset the access token state
    setProfile(null); // Reset the profile state
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
    <div className="max-h-screen flex flex-col justify-between bg-secondary-dark">
      <Header
        onLogOut={handleLogout}
        accessToken={accessToken}
        profile={profile}
        onLogin={initiateLogin}
      />

      <Routes>
        <Route path="/callback" element={<Callback />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
