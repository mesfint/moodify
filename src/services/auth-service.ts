import axios from 'axios';
import {
  generateCodeChallenge,
  generateRandomString,
} from '../utils/pkceUtils';

// Redirect the user to Spotify's authorization page
export const initiateLogin = () => {
  const clientId = '744fccda3a6d417184998410733cb884'; // Replace with your Spotify Client ID
  const redirectUri = 'http://localhost:5173/callback'; // Your redirect URI

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
    scope: 'user-read-private user-read-email,playlist-read-private',
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  // Redirect to Spotify's authorization endpoint
  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

// Fetch the user's profile data
export const fetchProfile = async (token: string) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    console.log('data', response.data);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};
