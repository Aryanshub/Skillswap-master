// components/SkillSwapLanding.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SkillSwapLanding() {
  return (
    <div className="bg-white pt-28 text-gray-900 overflow-hidden">
      <section className="pb-16 px-4 max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Learn. Share. Grow.
            <br />
            Welcome to <span className="text-purple-700">SkillSwap</span>.
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Connect with people to exchange skills. Whether you're a designer
            wanting to learn coding, or a developer curious about photography —
            SkillSwap is for you.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link
              href="/auth/signup"
              className="bg-purple-700 text-white px-6 py-3 rounded-lg text-sm hover:bg-purple-800 transition"
            >
              Join Now
            </Link>
            <Link
              href="/posts"
              className="text-purple-700 px-6 py-3 text-sm border border-purple-700 rounded-lg hover:bg-purple-50"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section: Image */}
        <motion.div
          className="hidden lg:block ml-24"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Image
  src="/hero.png"
  alt="SkillSwap Hero - People exchanging skills and learning together"
  width={500}
  height={500}
  className="rounded-xl"
  priority // Add this for above-the-fold images
 // placeholder="blur" // Optional: add blur placeholder
/>
        </motion.div>
      </section>
    </div>
  );
}
