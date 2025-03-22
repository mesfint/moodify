import axios from 'axios';
import {
  generateCodeChallenge,
  generateRandomString,
} from '../utils/pkceUtils';

export const initiateLogin = () => {
  const clientId = '744fccda3a6d417184998410733cb884';
  const redirectUri = 'http://localhost:5173/callback';

  const codeVerifier = generateRandomString(128);
  localStorage.setItem('code_verifier', codeVerifier);

  const codeChallenge = generateCodeChallenge(codeVerifier); // Now synchronous

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: 'user-read-private user-read-email playlist-read-private',
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const fetchProfile = async (token: string) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Profile fetch failed: ${error.response?.data?.error || error.message}`
      );
    }
    throw error;
  }
};
