"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
    const pathname = usePathname();
    const isDashboard = pathname === "/dashboard";

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/5 supports-[backdrop-filter]:bg-black/20"
        >
            {/* Left: Logo */}
            <div className="flex items-center">
                <Link
                    href={isDashboard ? "/dashboard" : "/"}
                    className="text-2xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity"
                >
                    Mavericko
                </Link>
            </div>

            {/* Middle: Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                {["Home", "About Us", "How it Works", "Contact Us"].map((item) => (
                    <Link
                        key={item}
                        href={
                            item === "Home" ? "#home" :
                                item === "About Us" ? "#about" :
                                    `#${item.toLowerCase().replace(/\s+/g, "-")}`
                        }
                        className="text-sm font-medium text-white/60 hover:text-white transition-colors relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
                    </Link>
                ))}
            </nav>

            {/* Right: Login/Sign Up */}
            <div className="flex items-center gap-4">
                <Link
                    href="/auth"
                    className="hidden md:block text-sm font-medium text-white hover:text-primary transition-colors"
                >
                    Login
                </Link>
                <Link
                    href="/auth"
                    className="px-6 py-2.5 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                    Sign Up
                </Link>
            </div>
        </motion.header>
    );
}
