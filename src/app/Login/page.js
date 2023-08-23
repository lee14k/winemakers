'use client'
import { useState, useEffect } from 'react';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import { useUser } from '@auth0/nextjs-auth0';
import { UserProvider } from '@auth0/nextjs-auth0';

function Login() {
  const [isClient, setIsClient] = useState(false);
  const user = isClient ? useUser() : {};

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (user.isLoading) return <div>Loading...</div>;
  if (user.error) return <div>{user.error.message}</div>;

  if (user.user) {
    return (
      <div>
        
        <Navbar />
        Welcome {user.user.name}! <a href="/api/auth/logout">Logout</a>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div>
        <button onClick={() => window.location.href = '/api/auth/login'}>
          Login with Auth0
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
