 "use client"; 

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    // Simulate sending request
    setTimeout(() => {
      setSent(true);
      toast.success("Reset link sent!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        className="bg-white p-8 shadow-xl rounded-xl w-full max-w-md border"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Forgot Your Password?
        </h2>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition duration-300"
            >
              🔐 Send Reset Link
            </button>
          </form>
        ) : (
          <motion.div
            className="text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-green-600 font-semibold text-lg">
              ✅ Check your email for a reset link!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )}