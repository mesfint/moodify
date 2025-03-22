import CryptoJS from 'crypto-js';

// Generate a random string for the code verifier (used in initiateLogin)
export const generateRandomString = (length: number) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length },
    () => possible[Math.floor(Math.random() * possible.length)]
  ).join('');
};

// Generate the code challenge from the code verifier (synchronous)
export const generateCodeChallenge = (codeVerifier: string): string => {
  const hash = CryptoJS.SHA256(codeVerifier);
  return hash.toString(CryptoJS.enc.Base64url);
};

// Not used, but kept for reference
export const generateCodeVerifier = () => {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => dec.toString(16).padStart(2, '0')).join('');
};
