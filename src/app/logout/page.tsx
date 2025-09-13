"use client"

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";

export default function LogoutPage() {
    const router = useRouter();
    //const [loading, setLoading] = React.useState(true);

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
        } finally {
            
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-black p-8 rounded shadow-md w-full max-w-md border border-white flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Logout</h2>
                <button
                    onClick={logout}
                    type="button"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md border border-green-400 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Log Out
                </button>
            </div>
        </div>
    );

}

