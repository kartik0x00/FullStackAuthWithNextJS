'use client';

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const router = useRouter();

    const verifyEmailFunction = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/verifyemail', { token });
            if (response.status === 200) {
                setVerified(true);
                setError("");
            }
        } catch (error: any) {
            console.error("Error during email verification:", error);
            if (error.response?.status === 400) {
                setError("Invalid or expired verification token. Please request a new verification email.");
            } else {
                setError("Failed to verify email. Please try again or contact support.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError("Invalid verification link. Please check your email for the correct link.");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyEmailFunction();
        }
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/50">
                
                {loading ? (
                    <div className="text-center space-y-6">
                        <div className="text-6xl mb-4">📧</div>
                        <h1 className="text-3xl font-bold text-white mb-2">Verifying Email</h1>
                        <p className="text-gray-400 mb-6">Please wait while we verify your email address...</p>
                        
                        <div className="flex flex-col items-center space-y-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            <div className="bg-gray-800/50 rounded-lg p-4 w-full">
                                <div className="flex items-center justify-center">
                                    <div className="animate-pulse text-gray-300">Verifying your email...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : verified ? (
                    <div className="text-center space-y-6">
                        <div className="bg-green-900/50 backdrop-blur-sm border border-green-700/50 rounded-2xl p-6">
                            <div className="text-green-400 text-6xl mb-4">✅</div>
                            <h1 className="text-3xl font-bold text-green-300 mb-2">Email Verified!</h1>
                            <p className="text-green-400">
                                Your email has been successfully verified. You can now access all features of your account.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Link 
                                href="/login"
                                className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-[1.02] text-center"
                            >
                                Continue to Login
                            </Link>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4">
                            <p className="text-gray-400 text-sm">
                                🎉 Welcome to our platform! Your account is now fully activated.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="bg-red-900/50 backdrop-blur-sm border border-red-700/50 rounded-2xl p-6">
                            <div className="text-red-400 text-6xl mb-4">❌</div>
                            <h1 className="text-3xl font-bold text-red-300 mb-2">Verification Failed</h1>
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>

                        <div className="space-y-4">
                            <Link 
                                href="/signup"
                                className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] text-center"
                            >
                                Request New Verification
                            </Link>
                            
                            <Link 
                                href="/login"
                                className="block w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-[1.02] text-center"
                            >
                                Back to Login
                            </Link>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4">
                            <p className="text-gray-400 text-sm">
                                💡 <strong>Tip:</strong> Check your spam folder or request a new verification email if needed.
                            </p>
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link href="/" className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}