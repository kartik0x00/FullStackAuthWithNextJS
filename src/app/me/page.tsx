'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MePage() {
    const [userData, setUserData] = useState<{
        _id: string;
        username: string;
        email: string;
        isVerified: boolean;
        isAdmin: boolean;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const router = useRouter();

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/users/me');
            if (response.status === 200) {
                setUserData(response.data.user);
            } else {
                setError("Failed to fetch user details");
                //router.push('/login');
            }
        } catch (error) {
            console.error("Failed to fetch user details:", error);
            setError("Failed to fetch user details");
            //router.push('/login');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout');
            if (response.status === 200) {
                router.push('/login');
            } else {
                console.error("Logout failed:", response.data.message);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black">
            <h1 className="text-4xl font-bold text-white mb-6">User Profile - Me Page</h1>
            
            {loading ? (
                <div className="text-white mb-6">Loading user details...</div>
            ) : error ? (
                <div className="text-red-400 mb-6">{error}</div>
            ) : userData ? (
                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md mb-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">My Details</h2>
                    <div className="space-y-2">
                        <p><span className="font-bold">ID:</span> {userData._id}</p>
                        <p><span className="font-bold">Username:</span> {userData.username}</p>
                        <p><span className="font-bold">Email:</span> {userData.email}</p>
                        <p><span className="font-bold">Verified:</span> {userData.isVerified ? 'Yes' : 'No'}</p>
                        <p><span className="font-bold">Admin:</span> {userData.isAdmin ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            ) : (
                <div className="text-white mb-6">No user data found</div>
            )}

            <div className="flex gap-4">
                <Link href="/profile" className="bg-blue-600 text-white py-2 px-4 rounded-md border border-blue-400 hover:bg-blue-700">
                    Go to Profile
                </Link>
                <button
                    onClick={logout}
                    type="button"
                    className="bg-red-600 text-white py-2 px-4 rounded-md border border-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}