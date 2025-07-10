import { useEffect, useState } from "react";
import Link from "next/link";
import API from "../services/api"; // Make sure this exists and points to your backend

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("campaigns/")
      .then((res) => {
        setCampaigns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
        setError("❌ Failed to load campaigns. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      
      {/* ✅ Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">🌟 CrowdfundIt</h1>
        <nav className="flex space-x-4">
          <Link href="/login" className="text-indigo-600 hover:underline">Login</Link>
          <Link href="/register" className="text-indigo-600 hover:underline">Register</Link>
        </nav>
      </header>

      {/* ✅ Main Section */}
      <main className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-indigo-800">
            📢 Explore Campaigns
          </h2>
          <Link href="/create-campaign">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
              ➕ Create Campaign
            </button>
          </Link>
        </div>

        {/* 🔄 Loading State */}
        {loading && (
          <p className="text-center text-gray-600 text-lg">
            ⏳ Loading campaigns...
          </p>
        )}

        {/* ❌ Error Message */}
        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {/* 🚫 No Campaigns */}
        {!loading && campaigns.length === 0 && (
          <p className="text-center text-gray-700 text-lg">
            🚫 No campaigns available.
          </p>
        )}

        {/* ✅ Campaign Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {campaigns.map((c) => (
            <Link href={`/campaigns/${c.id}`} key={c.id}>
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer border">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                  {c.title}
                </h2>
                <p className="text-gray-700 mb-3 line-clamp-3">{c.description}</p>
                <p className="text-sm text-gray-500">
                  🎯 <span className="font-semibold">Goal:</span> ₹{c.goal}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
