"use client";
import React ,{useState , useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export default function ProfilePage() {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        // fetch user data from me api using axios 
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/me');
                console.log('User data:', JSON.stringify(response.data?.user));
                setUser(response.data?.user); // Set the user data in state
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to fetch user data. Please try again.');
            }
        };
        fetchUserData();
    },[])

    const router = useRouter();
    const logout = async () => {
        try {
            // Call your logout API endpoint
            const response = await fetch('/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.success('Logout successful');
                // Redirect to the login page after successful logout
                // Clear the token from cookies or local storage if applicable
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clear the token cookie
                router.push('/login');
            } else {
                console.error('Logout failed:', response.statusText);
                toast.error('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <button
          onClick={() => logout()}   
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full mb-4"
        >
          Logout
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        {user && (
          <div className="mb-4">
            <p className="text-gray-700"><b>Username: </b>{user.username}</p>
            <p className="text-gray-700"><b>Email:</b> {user.email}</p>
            <p className="text-gray-700"><b>CreatedAt: </b>{user.createdAt}</p>
            <p className="text-gray-700"><b>UpdatedAt:</b> {user.updatedAt}</p>
            {/* Add more user details as needed */}
          </div>
        )}
        <p className="text-center">This is the profile page.</p>
        <Link href="/login" className="text-blue-600 hover:underline mt-4 block text-center">
          Go to Login
        </Link>

      </div>
    </div>
  );
}