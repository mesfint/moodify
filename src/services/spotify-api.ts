import { UserProfile } from '../types/spotify';
import axios from 'axios';

export const fetchProfile = async (
  accessToken: string
): Promise<UserProfile> => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};
