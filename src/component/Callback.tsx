import axios from 'axios';
import qs from 'qs';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  const handleCallback = async () => {
    console.log('Handling callback...');

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      console.error('Authorization code not found in URL.');
      return;
    }

    console.log('Authorization code found:', code);

    const codeVerifier = localStorage.getItem('code_verifier');

    if (!codeVerifier) {
      console.error('Code verifier not found in localStorage.');
      return;
    }

    console.log('Code verifier found:', codeVerifier);

    const payload = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:5173/callback', // Match your redirect URI
      client_id: '744fccda3a6d417184998410733cb884', // Replace with your Spotify Client ID
      code_verifier: codeVerifier,
    };

    console.log('Payload for token exchange:', payload);

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        qs.stringify(payload),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('Token exchange response:', response.data);

      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token); // Store the access token
      localStorage.setItem('code_verifier', codeVerifier); // Store the code verifier
      console.log('Access Token Stored:', access_token);
      console.log('Code Verifier Stored:', codeVerifier);

      navigate('/'); // Redirect to the root route
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  return <div>Loading...</div>;
};

export default Callback;
