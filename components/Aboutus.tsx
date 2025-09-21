"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { MessageCircle, Image, Sparkles, Star, Zap, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden pt-20 md:pt-24">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl"
        />
        
        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-4 h-4 text-white/30" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 md:mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 md:mb-6 drop-shadow-2xl px-4"
          >
            Meet{" "}
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.8)",
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
            >
              SkillSwap
            </motion.span>{" "}
            🚀
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16 px-4"
        >
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed backdrop-blur-sm bg-white/10 rounded-2xl p-4 sm:p-6 border border-white/20">
            Not just another learning platform… it&apos;s where{" "}
            <motion.b
              whileHover={{ scale: 1.1 }}
              className="text-purple-300 cursor-default"
            >
              skills party 🎉
            </motion.b>
            , posts gossip, and comments roast. Ready for the chaos?{" "}
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              😉
            </motion.span>
          </p>
        </motion.div>

        {/* Enhanced Chat Style */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20 space-y-4 md:space-y-6 px-4">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl w-fit max-w-xs sm:max-w-sm md:max-w-md"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                📢
              </div>
              <div>
                <div className="text-white font-semibold text-sm md:text-base">Post</div>
                <div className="text-gray-200 text-sm md:text-base">&quot;Hey! Look at me, I have a cool image 📸&quot;</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="backdrop-blur-lg bg-purple-500/30 border border-purple-300/50 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl w-fit max-w-xs sm:max-w-sm md:max-w-md ml-auto"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                💬
              </div>
              <div>
                <div className="text-white font-semibold text-sm md:text-base">Comment</div>
                <div className="text-gray-200 text-sm md:text-base">&quot;Bro… nice try, but where&apos;s the talent? 😂&quot;</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
            className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl w-fit max-w-xs sm:max-w-sm md:max-w-md"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                📢
              </div>
              <div>
                <div className="text-white font-semibold text-sm md:text-base">Post</div>
                <div className="text-gray-200 text-sm md:text-base">&quot;At least I&apos;m not boring like you 😎&quot;</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.6 }}
            className="backdrop-blur-lg bg-purple-500/30 border border-purple-300/50 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl w-fit max-w-xs sm:max-w-sm md:max-w-md ml-auto"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                💬
              </div>
              <div>
                <div className="text-white font-semibold text-sm md:text-base">Comment</div>
                <div className="text-gray-200 text-sm md:text-base">&quot;Fair. But I still run the show 🔥&quot;</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Features with 3D Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16 md:mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              rotateY: 15, 
              rotateX: 5, 
              scale: 1.05,
              z: 50 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            className="group backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 text-center hover:shadow-purple-500/20 transition-all duration-300"
            style={{ 
              transformStyle: "preserve-3d",
              perspective: "1000px" 
            }}
          >
            <motion.div
              whileHover={{ rotateY: 360 }}
              transition={{ duration: 0.8 }}
              className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center"
            >
              <MessageCircle className="text-white" size={24} />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Interactive Comments</h3>
            <p className="text-gray-300 text-base md:text-lg">Roast, cheer, or inspire anytime 💬</p>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-3 md:mt-4 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              rotateY: -15, 
              rotateX: 5, 
              scale: 1.05,
              z: 50 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.1 
            }}
            className="group backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 text-center hover:shadow-pink-500/20 transition-all duration-300"
            style={{ 
              transformStyle: "preserve-3d",
              perspective: "1000px" 
            }}
          >
            <motion.div
              whileHover={{ rotateY: 360 }}
              transition={{ duration: 0.8 }}
              className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl md:rounded-2xl flex items-center justify-center"
            >
              <Image size={24} className="text-white" />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Skillful Posts</h3>
            <p className="text-gray-300 text-base md:text-lg">Show off your talent with images ✨</p>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="mt-3 md:mt-4 w-full h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              rotateY: 15, 
              rotateX: 5, 
              scale: 1.05,
              z: 50 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.2 
            }}
            className="group backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 text-center hover:shadow-yellow-500/20 transition-all duration-300"
            style={{ 
              transformStyle: "preserve-3d",
              perspective: "1000px" 
            }}
          >
            <motion.div
              whileHover={{ rotateY: 360 }}
              transition={{ duration: 0.8 }}
              className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-r from-yellow-500 to-red-500 rounded-xl md:rounded-2xl flex items-center justify-center"
            >
              <Sparkles className="text-white" size={24} />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Fun UX</h3>
            <p className="text-gray-300 text-base md:text-lg">Fast, smooth, and funny to use ⚡</p>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="mt-3 md:mt-4 w-full h-1 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full"
            />
          </motion.div>
        </div>

        {/* Enhanced 3D Skill Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            rotateY: 25, 
            rotateX: -15, 
            scale: 1.1,
            z: 100 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 120,
            damping: 15 
          }}
          className="max-w-xs sm:max-w-sm mx-auto mb-16 md:mb-20 px-4"
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1000px" 
          }}
        >
          <Card className="shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-lg border border-white/20">
            <CardContent className="p-6 md:p-8 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 text-white relative overflow-hidden">
              {/* Floating elements inside card */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1.2, 1, 1.2] 
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full"
              />
              
              <div className="relative z-10">
                <motion.h3 
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 flex items-center gap-2"
                >
                  🎭 Skill Post
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.span>
                </motion.h3>
                <p className="mb-4 md:mb-6 text-base md:text-lg">
                  &quot;I&apos;m not just a post… I&apos;m a superstar ⭐. Wanna comment?&quot;
                </p>
                <motion.button
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: -3,
                    boxShadow: "0 10px 25px rgba(255,255,255,0.3)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-700 px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-base md:text-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  Comment Now 💬
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Closing Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl"
          >
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed mb-4 md:mb-6"
              whileHover={{ scale: 1.05 }}
            >
              SkillSwap is the{" "}
              <motion.b
                animate={{ 
                  color: ["#ffffff", "#ff6b9d", "#c44569", "#ffffff"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity 
                }}
                className="cursor-default"
              >
                Netflix of Skills
              </motion.b>{" "}
              🍿— binge talents, drop comments, and flex your creativity!
            </motion.p>
            <motion.p 
              className="font-extrabold text-purple-300 text-xl sm:text-2xl md:text-3xl flex flex-wrap items-center justify-center gap-2 md:gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <span>Ready to swap some skills?</span>{" "}
              <motion.span
                animate={{ 
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1 
                }}
                className="inline-block"
              >
                🔄
              </motion.span>
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  textShadow: [
                    "0 0 10px rgba(255,107,157,0.5)",
                    "0 0 20px rgba(255,107,157,1)",
                    "0 0 10px rgba(255,107,157,0.5)",
                  ] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity 
                }}
              >
                🔥
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;