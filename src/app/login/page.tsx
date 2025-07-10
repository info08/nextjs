"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import  axios  from 'axios';


export default function LoginPage() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User data:', JSON.stringify(user));
    // use axios to send a POST request to the login API
    try {
      const response = await axios.post('/api/login', user);
      console.log('Login successful:', response.data);
      const userInfo = response.data.user;
      // Redirect to the dashboard or home page after successful login
      // set the tokken in cookie
      document.cookie = `token=${userInfo.token}; path=/; max-age=3600`; // Set token with 1 hour expiration
      router.push(`/profile`); // Adjust the path as needed
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show an error message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={onLogin} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-center">
            Don&#39t have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
          <p className="mt-2 text-sm text-center">
            <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}