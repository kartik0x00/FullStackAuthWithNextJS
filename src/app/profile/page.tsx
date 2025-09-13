'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
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

    const getUserProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/users/profile');
            if (response.status === 200) {
                setUserData(response.data.data);
            } else {
                setError("Failed to fetch user profile");
                //router.push('/login');
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            setError("Failed to fetch user profile");
            //router.push('/login');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout');
            if (response.status === 200) {
                // Redirect to login page after successful logout
                router.push('/login');
            } else {
                console.error("Logout failed:", response.data.message);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">Profile Dashboard</h1>
                    <p className="text-gray-400 text-lg">Manage your account and preferences</p>
                </div>
                
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
                        <p className="text-white text-lg">Loading your profile...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-900/50 backdrop-blur-sm border border-red-700/50 rounded-2xl p-8 text-center">
                        <div className="text-red-400 text-6xl mb-4">⚠️</div>
                        <h3 className="text-red-300 text-xl font-semibold mb-2">Error Loading Profile</h3>
                        <p className="text-red-400">{error}</p>
                    </div>
                ) : userData ? (
                    <div className="flex justify-center">
                        {/* Profile Card */}
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl w-full max-w-2xl">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {userData.username?.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold text-white">{userData.username}</h2>
                                    <p className="text-gray-400">User Profile</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <label className="text-sm text-gray-400 font-medium">User ID</label>
                                    <p className="text-white font-mono text-sm break-all">{userData._id}</p>
                                </div>
                                
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <label className="text-sm text-gray-400 font-medium">Email Address</label>
                                    <p className="text-white">{userData.email}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-800/50 rounded-lg p-4">
                                        <label className="text-sm text-gray-400 font-medium">Verification Status</label>
                                        <div className="flex items-center mt-1">
                                            <div className={`w-3 h-3 rounded-full mr-2 ${userData.isVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <p className={`font-medium ${userData.isVerified ? 'text-green-400' : 'text-red-400'}`}>
                                                {userData.isVerified ? 'Verified' : 'Not Verified'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-800/50 rounded-lg p-4">
                                        <label className="text-sm text-gray-400 font-medium">Account Type</label>
                                        <div className="flex items-center mt-1">
                                            <div className={`w-3 h-3 rounded-full mr-2 ${userData.isAdmin ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                                            <p className={`font-medium ${userData.isAdmin ? 'text-purple-400' : 'text-blue-400'}`}>
                                                {userData.isAdmin ? 'Admin' : 'User'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sign Out Button */}
                                <div className="pt-6 border-t border-gray-700">
                                    <button
                                        onClick={logout}
                                        type="button"
                                        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center">
                        <div className="text-gray-400 text-6xl mb-4">👤</div>
                        <h3 className="text-gray-300 text-xl font-semibold mb-2">No Profile Data</h3>
                        <p className="text-gray-400">Unable to load user information</p>
                    </div>
                )}
            </div>
        </div>
    );
}