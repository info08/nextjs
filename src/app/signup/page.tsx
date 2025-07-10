"use client";
import React ,{useState , useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//import {axios} from 'axios';


export default function SignupPage() {
  const [user,setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const router = useRouter();
  const onSignup = async (e:any) => {
    e.preventDefault();
    console.log('User data:', JSON.stringify(user));
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        router.push('/login'); // Redirect to login page after successful signup
        console.log('Signup successful:', JSON.stringify(data));
        // Redirect or show success message
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
 };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={onSignup} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={user.username}
              onChange={e => setUser({ ...user, username: e.target.value })}
            />
          </div>
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
            Sign Up
          </button>
            <p className="mt-4 text-sm text-center">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                Log in
                </Link>
            </p>
        </form>
      </div>
    </div>
  );
}