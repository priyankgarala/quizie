"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // For icons

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Quizie
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/quiz" className="hover:text-gray-400">
            Quizzes
          </Link>
          <Link href="/leaderboard" className="hover:text-gray-400">
            Leaderboard
          </Link>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
        </div>

        {/* Start Quiz Button */}
        <Link href="/quiz" className="hidden md:block bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
          Start Quiz
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-gray-800 p-4 space-y-2">
          <Link href="/quiz" className="block hover:text-gray-400">
            Quizzes
          </Link>
          <Link href="/leaderboard" className="block hover:text-gray-400">
            Leaderboard
          </Link>
          <Link href="/about" className="block hover:text-gray-400">
            About
          </Link>
          <Link href="/quiz" className="block bg-blue-500 px-4 py-2 rounded-lg text-center hover:bg-blue-600">
            Start Quiz
          </Link>
        </div>
      )}
    </nav>
  );
}
