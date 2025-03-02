import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserProfile } from '../types/spotify';
import {
  generateCodeChallenge,
  generateRandomString,
} from '../utils/pkceUtils';

// interface SpotifyProfile {
//   display_name: string;
//   email: string;
//   id: string;
//   uri: string;
//   images: { url: string }[];
// }

const SpotifyAuth: React.FC = () => {
  const navigate = useNavigate();
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

  // Fetch the user's profile data
  const fetchProfile = async (token: string) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      console.log('data', response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);
      fetchProfile(token);
    }
  }, []);

  // Redirect the user to Spotify's authorization page
  const initiateLogin = () => {
    const clientId = '744fccda3a6d417184998410733cb884'; // Replace with your Spotify Client ID
    const redirectUri = 'http://localhost:5174/callback'; // Your redirect URI

    // Generate a random code verifier
    const codeVerifier = generateRandomString(128);

    // Store the code verifier in localStorage
    localStorage.setItem('code_verifier', codeVerifier);
    console.log('Code verifier stored:', codeVerifier);

    // Generate the code challenge
    const codeChallenge = generateCodeChallenge(codeVerifier);

    // Prepare the authorization URL
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: 'user-read-private user-read-email',
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });

    // Redirect to Spotify's authorization endpoint
    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Moodify</h1>
      {!accessToken ? (
        <button
          onClick={initiateLogin}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Login with Spotify
        </button>
      ) : (
        <div className="mb-4">
          <img
            src={profile?.images[0]?.url}
            alt={profile?.display_name}
            className="w-24 h-24 rounded-full mb-2"
          />
          <p className="font-bold">{profile?.display_name}</p>
          <p>Email: {profile?.email}</p>
          <p>ID: {profile?.id}</p>
          <p>Profile: {profile?.uri}</p>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotifyAuth;
