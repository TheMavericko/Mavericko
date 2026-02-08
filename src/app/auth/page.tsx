"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // Toggle variant for animation
    const toggleVariants = {
        login: { x: 0 },
        signup: { x: "100%" },
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-neutral-950 text-white">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[30%] w-[30%] h-[30%] bg-violet-800/10 rounded-full blur-[100px] animate-pulse delay-2000" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Back to Home */}
                <Link
                    href="/"
                    className="absolute -top-16 left-6 flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                >
                    {/* Top Toggle Switch */}
                    <div className="relative w-full h-12 bg-neutral-900/50 rounded-lg p-1 flex mb-8 border border-white/5">
                        <motion.div
                            className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-neutral-800 rounded-md shadow-sm border border-white/5 z-0"
                            animate={{ x: isLogin ? 0 : "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 relative z-10 text-sm font-medium transition-colors duration-200 ${isLogin ? "text-white" : "text-neutral-400 hover:text-white"
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 relative z-10 text-sm font-medium transition-colors duration-200 ${!isLogin ? "text-white" : "text-neutral-400 hover:text-white"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold tracking-tight mb-2">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-neutral-400 text-sm">
                            {isLogin
                                ? "Enter your credentials to access your account."
                                : "Join Mavericko and start your journey."}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.form
                            key={isLogin ? "login" : "signup"}
                            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {!isLogin && (
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-neutral-400 ml-1">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-purple-400 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-neutral-900/80 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-neutral-400 ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full bg-neutral-900/80 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-medium text-neutral-400 ml-1">
                                        Password
                                    </label>
                                    {isLogin && (
                                        <Link
                                            href="#"
                                            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                        >
                                            Forgot?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full bg-neutral-900/80 border border-white/10 rounded-lg py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transform hover:-translate-y-0.5 transition-all duration-200 mt-2"
                            >
                                {isLogin ? "Sign In" : "Create Account"}
                            </button>
                        </motion.form>
                    </AnimatePresence>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#0a0a0a] px-2 text-neutral-500 font-medium">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-sm font-medium text-white transition-all duration-200 group">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </button>
                </motion.div>

                {/* Footer simple link */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-neutral-500">
                        By continuing, you agree to Mavericko's <Link href="#" className="underline hover:text-white">Terms</Link> and <Link href="#" className="underline hover:text-white">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
