"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-100 to-white px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-4">
          🌟 Welcome to CrowdfundIt
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
          Launch your dream project or support someone's vision. Join our crowdfunding community and make a difference today!
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/create-campaign">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow hover:bg-indigo-700 transition">
              🎯 Start a Campaign
            </button>
          </Link>
          <Link href="/about">
            <button className="border border-indigo-600 text-indigo-700 px-6 py-3 rounded-md hover:bg-indigo-100 transition">
              ℹ️ Learn More
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Animation Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12"
      >
        <Image
          src="/images/crowdfunding-hero.png"
          alt="Crowdfunding Animation"
          width={500}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </motion.div>
    </div>
  );
}
