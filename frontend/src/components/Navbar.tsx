"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-700">
            🌟 CrowdfundIt
          </Link>

          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>

          <div
            className={`flex-1 justify-end items-center w-full md:flex md:w-auto ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
              <li>
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-100"
                  onClick={() => setIsOpen(false)}
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                {/* <Link
                  href="/about"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-100"
                  onClick={() => setIsOpen(false)}
                >
                  ℹ️ About
                </Link> */}
              </li>
              <li>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-100"
                  onClick={() => setIsOpen(false)}
                >
                  📝 Register
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-100"
                  onClick={() => setIsOpen(false)}
                >
                  🔐 Login
                </Link>
              </li>
              <li>
                <Link
                  href="/create-campaign"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-100"
                  onClick={() => setIsOpen(false)}
                >
                  🎯 Create Campaign
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns/1"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-100"
                  onClick={() => setIsOpen(false)}
                >
                  📢 Campaign #1
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
