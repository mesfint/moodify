import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoodify } from '../hooks/useMoodify';
import { fetchProfile } from '../services/auth-service';

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const { setAccessToken, setProfile } = useMoodify();

  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      console.error('No code in URL');
      navigate('/');
      return;
    }

    const codeVerifier = localStorage.getItem('code_verifier');

    if (!codeVerifier) {
      console.error('No code_verifier in localStorage');
      navigate('/');
      return;
    }

    const payload = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:5173/callback',
      client_id: '744fccda3a6d417184998410733cb884',
      code_verifier: codeVerifier,
    };

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

      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      setAccessToken(access_token);

      const profileData = await fetchProfile(access_token);
      setProfile(profileData);

      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Token exchange failed:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
      navigate('/');
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  return <div>Loading...</div>;
};

export default Callback;
