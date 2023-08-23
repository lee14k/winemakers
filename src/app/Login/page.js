'use client'
import { useState, useEffect } from 'react';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import { useUser } from '@auth0/nextjs-auth0';

export default function Login() {
  return <a href="/api/auth/login">Login</a>;
}