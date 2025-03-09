"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/user");
      const data = await res.json();
      if (res.ok) {
        setUserName(data.user.name);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Quizie
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/quizes" className="hover:text-gray-400">Quizzes</Link>
          <Link href="/leaderboard" className="hover:text-gray-400">Leaderboard</Link>
          <Link href="/about" className="hover:text-gray-400">About</Link>
        </div>

        <div className="md:flex md:flex-row items-center gap-4 hidden">
          {/* Start Quiz Button (Only for logged-in users) */}
          {userName ? (
            <Link href="/newquiz/quiz" className="hidden md:block bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
              Start Quiz
            </Link>
          ) : (
            <button 
              onClick={() => alert("Please sign in to start a quiz!")} 
              className="hidden md:block bg-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
            >
              Start Quiz
            </button>
          )}

          {/* Show user name if logged in */}
          {userName ? (
            <span className="text-white">👤 {userName}</span>
          ) : (
            <Link href="/auth/login" className="text-white">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-gray-800 p-4 space-y-2">
          <Link href="/quizes" className="block hover:text-gray-400">Quizzes</Link>
          <Link href="/leaderboard" className="block hover:text-gray-400">Leaderboard</Link>
          <Link href="/about" className="block hover:text-gray-400">About</Link>

          {/* Start Quiz Button (Only for logged-in users) */}
          {userName ? (
            <Link href="/newquiz/quiz" className="block bg-blue-500 px-4 py-2 rounded-lg text-center hover:bg-blue-600">
              Start Quiz
            </Link>
          ) : (
            <button 
              onClick={() => alert("Please sign in to start a quiz!")} 
              className="block bg-gray-500 px-4 py-2 rounded-lg text-center cursor-not-allowed"
            >
              Start Quiz
            </button>
          )}

          {/* Show user name in mobile menu */}
          {userName ? (
            <span className="block text-center text-white mt-2">👤 {userName}</span>
          ) : (
            <Link href="/auth/login" className="block text-center text-white mt-2">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
