import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Callback from './component/Callback';
import NavBar from './component/NavBar';
import { fetchProfile } from './services/auth-service';
import { UserProfile } from './types/spotify';

const App: React.FC = () => {
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
    <>
      <NavBar
        onLogOut={handleLogout}
        accessToken={accessToken}
        profile={profile}
      />

      <Routes>
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </>
  );
};

export default App;
