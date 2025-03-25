"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
          <Link href="/howto" className="hover:text-gray-400">How to Use?</Link>
          <Link href="/contact" className="block hover:text-gray-400">Contact</Link>
          <Link href="/about" className="hover:text-gray-400">About</Link>
        </div>

        <div className="md:flex md:flex-row items-center gap-4 hidden">
          
            <Link href="/newquiz/quiz" className="hidden md:block bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
              Start Quiz
            </Link>
            

          {/* Show user name if logged in */}
            <span className="text-white"></span>
            <Link href="/login" className="text-white">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-gray-800 p-4 space-y-2">
          <Link href="/howto" className="block hover:text-gray-400">How to Use?</Link>
          <Link href="/contact" className="block hover:text-gray-400">Contact</Link>
          <Link href="/about" className="block hover:text-gray-400">About</Link>

            <Link href="/newquiz/quiz" className="block bg-blue-500 px-4 py-2 rounded-lg text-center hover:bg-blue-600">
              Start Quiz
            </Link>
            

            <span className="block text-center text-white mt-2"></span>
            <Link href="/login" className="block text-center text-white mt-2">Login</Link>
          
        </div>
      )}
    </nav>
  );
}
