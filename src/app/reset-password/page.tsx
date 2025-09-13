"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ResetPasswordPage: React.FC = () => {
    const [token, setToken] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Extract token from URL on component mount
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError("Invalid reset link. Please request a new password reset.");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!token) {
            setError("Invalid or missing token");
            return;
        }

        if (newpassword.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (newpassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post('/api/users/reset-password', { token, newpassword });

            if (res.status === 200) {
                setSuccess(true);
                setMessage("Password reset successful! Redirecting to login...");
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError("Failed to reset password. Please try again.");
            }
        } catch (err: any) {
            if (err.response?.status === 400) {
                setError("Invalid or expired reset token. Please request a new password reset.");
            } else {
                setError("Failed to reset password. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (error && !token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/50 text-center">
                    <div className="text-red-400 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-white mb-4">Invalid Link</h2>
                    <p className="text-red-300 mb-6">{error}</p>
                    <Link 
                        href="/forgot-password" 
                        className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                    >
                        Request New Reset Link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/50">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🔑</div>
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-gray-400">Create your new secure password</p>
                </div>

                {success ? (
                    <div className="text-center space-y-6">
                        <div className="bg-green-900/50 backdrop-blur-sm border border-green-700/50 rounded-2xl p-6">
                            <div className="text-green-400 text-4xl mb-4">✅</div>
                            <h3 className="text-green-300 text-xl font-semibold mb-2">Password Reset Successfully!</h3>
                            <p className="text-green-400 text-sm">{message}</p>
                        </div>
                        
                        <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
                                <span className="text-gray-300">Redirecting to login...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={newpassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                placeholder="Enter new password (min 6 characters)"
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                placeholder="Confirm your new password"
                                minLength={6}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-900/50 backdrop-blur-sm border border-red-700/50 rounded-lg p-3">
                                <p className="text-red-300 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !newpassword || !confirmPassword || !token}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Resetting Password...
                                </div>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">
                        Remember your password?{" "}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
                            Back to Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;