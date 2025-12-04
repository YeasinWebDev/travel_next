"use client";

import { useState } from "react";
import { FaPaperPlane, FaCheckCircle, FaEnvelope } from "react-icons/fa";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-teal-100 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <FaEnvelope className="text-blue-600" />
                  <span>Join Our Community</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Travel Deals</span> & Updates
                </h2>

                <p className="text-gray-600 text-lg mb-8">Subscribe to our newsletter and be the first to receive:</p>

                <ul className="space-y-3 mb-8">
                  {[
                    "🎯 Early bird discounts & flash sales",
                    "✈️ Curated travel packages",
                    "📍 Hidden gem destinations",
                    "🎁 Member-only giveaways",
                    "📅 Seasonal trip planning guides",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>No spam, ever</span>
                  </div>
                  <span>•</span>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaPaperPlane className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Join 10,000+ Travelers</h3>
                  <p className="text-gray-600">Get weekly inspiration delivered to your inbox</p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheckCircle className="text-green-600 text-3xl" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Welcome aboard! 🎉</h4>
                    <p className="text-gray-600 mb-4">Check your email to confirm your subscription and get your first travel tip!</p>
                    <button onClick={() => setIsSubmitted(false)} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Subscribe another email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          disabled={isSubmitting}
                        />
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          <span>Subscribe Now</span>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By subscribing, you agree to our{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and consent to receive travel updates.
                    </p>
                  </form>
                )}

                {/* Stats */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">10K+</div>
                      <div className="text-sm text-gray-600">Subscribers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">98%</div>
                      <div className="text-sm text-gray-600">Open Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">24h</div>
                      <div className="text-sm text-gray-600">Weekly Updates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-6">Trusted by travelers worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 cursor-pointer">
              <div className="text-2xl">🌎</div>
              <div className="text-2xl">✈️</div>
              <div className="text-2xl">🏨</div>
              <div className="text-2xl">🎯</div>
              <div className="text-2xl">⭐</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
