import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import API from "../../services/api";

// ✅ Replace with your actual Stripe publishable key
const stripePromise = loadStripe("pk_test_51Rird4D7iQRRqVfeQiwLI3xTwlYLUfVjklE8TUXZzV2JW711f45HSLLHDIvPA9pZwGuOhfRGYVWmpEPFetJujNY200CRiAWifX");

export default function CampaignDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState("");

  // ✅ Fetch campaign details
  useEffect(() => {
    if (id) {
      API.get(`campaigns/${id}/`)
        .then((res) => {
          setCampaign(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching campaign:", err);
          setLoading(false);
        });
    }
  }, [id]);

  // ✅ Manual donation handler
  const handleManualDonate = async () => {
    if (!donationAmount) return alert("❌ Please enter a donation amount.");
    try {
      await API.post("donate/", {
        campaign: campaign.id,
        amount: donationAmount,
      });
      alert("✅ Donation successful!");
      setDonationAmount("");
    } catch (error) {
      console.error("Donation error:", error);
      alert("❌ Manual donation failed. Make sure you're logged in.");
    }
  };

  // ✅ Stripe donation handler
  const handleStripeDonate = async () => {
    if (!donationAmount) return alert("❌ Please enter a donation amount.");
    try {
      const res = await API.post("create-checkout-session/", {
        campaign_id: campaign.id,
        amount: donationAmount,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      console.error("Stripe donation failed", err);
      alert("❌ Stripe donation failed.");
    }
  };

  if (loading) return <div className="p-6">Loading campaign...</div>;
  if (!campaign) return <div className="p-6 text-red-500">❌ Campaign not found.</div>;

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Campaign Info & Donation */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-3 text-blue-700">{campaign.title}</h1>
          <p className="text-gray-700 mb-4">{campaign.description}</p>
          <p className="text-gray-600 mb-2">
            🎯 <strong>Goal:</strong> ₹{campaign.goal}
          </p>
          <p className="text-gray-600 mb-6">
            📅 <strong>Created:</strong>{" "}
            {new Date(campaign.created_at).toLocaleDateString()}
          </p>

          {/* Donation Input */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">💰 Enter Donation Amount (₹)</label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Amount"
              min="1"
              required
            />
          </div>

          {/* Donation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleManualDonate}
              className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              💸 Manual Donate
            </button>
            <button
              onClick={handleStripeDonate}
              className="flex-1 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              💳 Donate via Card
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mt-6 text-sm text-blue-500 hover:underline"
          >
            🔙 Go Back
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center p-6">
          <img
            src="https://wallpapers.com/images/hd/web-developerat-work-illustration-png-9wxnnbpbatv5o2dn.png"
            alt="Campaign"
            className="max-h-[400px] w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
