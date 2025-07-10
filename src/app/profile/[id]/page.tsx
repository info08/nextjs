"use client";
import React ,{FC} from 'react';  
import Link from 'next/link';
//import { useRouter } from 'next/navigation';
//import { useState } from 'react';
//import axios from 'axios';

interface PageProps {
  params: { id: string };
}


 const UserProfilePage: FC<PageProps> = ({ params }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile {params.id}</h2>
        <p className="text-center">This is the user profile page.</p>
        <Link href="/profile" className="text-blue-600 hover:underline mt-4 block text-center">
          Go to profile
        </Link>
      </div>
    </div>
  );
}

export default UserProfilePage;