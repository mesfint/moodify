// src/services/auth-service.ts
import {
  generateCodeChallenge,
  generateCodeVerifier,
} from '../utils/pkceUtils';
import { getAccessToken } from './authCodeWithPkce';
import { fetchProfile } from './spotify-api';

export const handleAuthentication = async (): Promise<any> => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  // Declare redirectUri and clientId outside the conditional block
  const redirectUri = 'http://localhost:5174/callback'; // Ensure this matches the dashboard
  const clientId = '744fccda3a6d417184998410733cb884'; // Replace with your actual client ID

  if (!code) {
    // Generate code verifier and challenge
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem('code_verifier', codeVerifier);
    console.log('Stored Code Verifier:', localStorage.getItem('code_verifier')); // Debug log

    const codeChallenge = await generateCodeChallenge(codeVerifier);
    console.log('Generated Code Challenge:', codeChallenge);

    const scopes = [
      'user-read-private',
      'playlist-read-private',
      'user-library-read',
    ].join(',');

    // Redirect user to Spotify for authentication
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    return null; // No token available yet
  }

  try {
    // Exchange authorization code for access token
    const accessToken = await getAccessToken(code, redirectUri); // Use redirectUri here
    localStorage.setItem('access_token', accessToken); // Save token securely

    // Fetch user profile
    const profile = await fetchProfile(accessToken);
    return profile;
  } catch (error) {
    console.error('Authentication failed:', error);
    return null;
  }
};
