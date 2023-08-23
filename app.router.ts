import { createRouter, Response } from '@vercel/nft';
import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from "@auth0/nextjs-auth0";

const auth = handleAuth({
  getLogin: handleLogin,
  getLogout: handleLogout,
  getCallback: handleCallback,
  getProfile: handleProfile,
});

export default createRouter()
  .add('/api/auth/login', 'GET', (req, res) => auth(req, res))
  .add('/api/auth/logout', 'GET', (req, res) => auth(req, res))
  .add('/api/auth/callback', 'GET', (req, res) => auth(req, res))
  .add('/api/auth/me', 'GET', (req, res) => auth(req, res))
  .onError((req, res, error) => {
    console.error(error);
    return Response.error(req, res, 500, 'An unexpected error occurred.');
  });
