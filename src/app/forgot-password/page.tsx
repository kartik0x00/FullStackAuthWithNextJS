"use client";

import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        
        try {
            const res = await axios.post('/api/users/forgot-password', { email });

            if (res.status === 200) {
                console.log("Password reset email sent");
                setSubmitted(true);
            } else {
                setError("Failed to send reset link. Please try again.");
            }
        } catch (err) {
            console.error("Error sending reset link:", err);
            setError("Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/50">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🔐</div>
                    <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                    <p className="text-gray-400">No worries, we&apos;ll send you reset instructions</p>
                </div>

                {submitted ? (
                    <div className="text-center space-y-6">
                        <div className="bg-green-900/50 backdrop-blur-sm border border-green-700/50 rounded-2xl p-6">
                            <div className="text-green-400 text-4xl mb-4">📧</div>
                            <h3 className="text-green-300 text-xl font-semibold mb-2">Email Sent!</h3>
                            <p className="text-green-400 text-sm">
                                If an account exists for <span className="font-medium">{email}</span>, 
                                a password reset link has been sent to your inbox.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <p className="text-gray-400 text-sm">
                                Didn&apos;t receive the email? Check your spam folder or try again.
                            </p>
                            <button
                                onClick={() => {setSubmitted(false); setEmail("");}}
                                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
                            >
                                Try Different Email
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                placeholder="Enter your email address"
                            />
                        </div>
                        
                        {error && (
                            <div className="bg-red-900/50 backdrop-blur-sm border border-red-700/50 rounded-lg p-3">
                                <p className="text-red-300 text-sm">{error}</p>
                            </div>
                        )}
                        
                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Sending Reset Link...
                                </div>
                            ) : (
                                "Send Reset Link"
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

export default ForgotPasswordPage;