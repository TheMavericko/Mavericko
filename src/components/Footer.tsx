"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Mail, Send } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

                    {/* LEFT: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
                    >
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-3">Raise a Query</h2>
                            <p className="text-white/60">Have questions or feedback? We'd love to hear from you.</p>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-white/70">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="John Doe"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-white/70">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-white/70">Your Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="How can we help you?"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="button"
                                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-6 py-4 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Send Message
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>

                    {/* RIGHT: Navigation Links */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 content-start pt-4">
                        {/* Company */}
                        <div>
                            <h3 className="font-bold text-white mb-6">COMPANY</h3>
                            <ul className="space-y-4 text-white/60">
                                <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
                                <li><span className="text-white/30 cursor-not-allowed">Careers</span></li>
                                <li><span className="text-white/30 cursor-not-allowed">Blogs</span></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="font-bold text-white mb-6">LEGAL</h3>
                            <ul className="space-y-4 text-white/60">
                                <li><span className="text-white/30 cursor-not-allowed">Privacy Policy</span></li>
                                <li><span className="text-white/30 cursor-not-allowed">Terms of Service</span></li>
                            </ul>
                        </div>

                        {/* Product */}
                        <div>
                            <h3 className="font-bold text-white mb-6">PRODUCT</h3>
                            <ul className="space-y-4 text-white/60">
                                <li><span className="text-white/30 cursor-not-allowed">Job Listings</span></li>
                                <li><span className="text-white/30 cursor-not-allowed">Reviews</span></li>
                                <li><span className="text-white/30 cursor-not-allowed">Pricing</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
                        <p className="text-white/40 text-sm">
                            &copy; 2026 Mavericko. All rights reserved.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <Link href="#" className="text-white/40 hover:text-white transition-colors hover:scale-110"><Twitter size={20} /></Link>
                        <Link href="#" className="text-white/40 hover:text-white transition-colors hover:scale-110"><Linkedin size={20} /></Link>
                        <Link href="#" className="text-white/40 hover:text-white transition-colors hover:scale-110"><Github size={20} /></Link>
                        <Link href="#" className="text-white/40 hover:text-white transition-colors hover:scale-110"><Mail size={20} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
