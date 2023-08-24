"use client"
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Login() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <main>
      {user ? (
        <div>
          <div>User: {user.email}</div>
          <a href="localhost:3001/api/auth/logout">Logout</a>
        </div>
      ) : (
        <a href="localhost:3001/api/login">Login</a>
      )}
    </main>
  )
}