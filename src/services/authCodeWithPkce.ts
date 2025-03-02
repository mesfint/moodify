export const getAccessToken = async (
  code: string,
  redirectUri: string
): Promise<string> => {
  const codeVerifier = localStorage.getItem('code_verifier');
  console.log('codeVerifier', codeVerifier);
  if (!codeVerifier) {
    throw new Error('Code verifier not found');
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri, // Ensure this matches the dashboard
    client_id: '744fccda3a6d417184998410733cb884', // Replace with your actual client ID
    code_verifier: codeVerifier,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Token exchange failed:', errorData);
    throw new Error(
      `Failed to fetch access token: ${errorData.error_description || response.statusText}`
    );
  }

  const data = await response.json();
  return data.access_token;
};
