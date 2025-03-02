import CryptoJS from 'crypto-js';

export const generateCodeVerifier = () => {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => dec.toString(16).padStart(2, '0')).join('');
};

export const generateCodeChallenge = (codeVerifier: string): string => {
  return CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64url);
};

// Generate a random string for the code verifier
export const generateRandomString = (length: number) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length },
    () => possible[Math.floor(Math.random() * possible.length)]
  ).join('');
};
