"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Utensils } from "lucide-react";
import Link from "next/link";
import MessMateLogo from "@/assets/logo.jpg";
import { motion } from "framer-motion";

export default function IntroPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-orange-100">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-4 mb-12"
      >
        <motion.img
          src={MessMateLogo.src}
          alt="MessMate Logo"
          className="h-28 w-auto drop-shadow-2xl rounded-full border-4 border-white shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-600 via-orange-600 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
          MessMate
        </h1>
        <p className="text-gray-700 text-center max-w-xl text-lg leading-relaxed">
          Smart Mess Management Dashboard — manage menus, track feedback, and
          monitor stock all in one place.
        </p>
      </motion.div>

      {/* Card with Intro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border border-gray-200 rounded-2xl bg-white/70 backdrop-blur-xl">
          <CardContent className="flex flex-col items-center gap-6 p-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
            >
              <Utensils className="h-12 w-12 text-yellow-600 drop-shadow-md" />
            </motion.div>
            <p className="text-gray-700 text-center text-lg leading-relaxed">
              Welcome to <span className="font-semibold">MessMate</span>. Please
              log in to access your dashboard and manage daily operations. If
              Admin then use registered ID and password.
            </p>

            {/* Login Button */}
            <Link href="/login" className="w-full">
              <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white text-lg py-6 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02]">
                Login
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-sm text-gray-600"
      >
        © {new Date().getFullYear()} MessMate. All rights reserved.
      </motion.footer>
    </div>
  );
}
