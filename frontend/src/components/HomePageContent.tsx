"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HomePageContent() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
          Empower Ideas, Fund the Future 🚀
        </h1>
        <p className="text-gray-700 mb-8 text-lg">
          Discover meaningful projects and help bring them to life through our community crowdfunding platform.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/create-campaign">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">
              🎯 Start a Campaign
            </button>
          </Link>
          <Link href="/campaigns/1">
            <button className="border border-indigo-600 text-indigo-700 px-6 py-3 rounded-md hover:bg-indigo-100 transition">
              👀 View Campaign
            </button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-16 flex justify-center"
      >
        <Image
          src="/images/crowdfunding-hero.png"
          alt="Crowdfunding"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </motion.div>
    </div>
  );
}
