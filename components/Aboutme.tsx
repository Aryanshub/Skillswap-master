"use client";
import { useState, useEffect } from "react";

import { Info, Github, Linkedin, Mail, Code, Bug, Zap, Heart, Sparkles, Terminal, FileCode, Cpu, Lightbulb, Link } from "lucide-react";
import Image from "next/image";



export default function AboutMe() {
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  const emojis = ["👨‍💻", "🚀", "🔥", "⚡", "🎯", "💻", "🧠", "✨"];
  const typewriterText = "The Commit You'll Never Ctrl+Z";

  useEffect(() => {
    setIsVisible(true);
    
    // Emoji rotation
    const emojiInterval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 2000);
    
    // Typewriter effect
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < typewriterText.length) {
        setTypedText(typewriterText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
    
    return () => {
      clearInterval(emojiInterval);
      clearInterval(typeInterval);
    };
  }, [emojis.length, typewriterText]);

  const skills = [
    { icon: Code, text: "Full-stack apps (Next.js + Prisma + PostgreSQL)", color: "text-blue-600" },
    { icon: Sparkles, text: "Design clean UIs with Tailwind + passion", color: "text-purple-600" },
    { icon: Bug, text: "Hunt bugs like an undercover agent 🕵️", color: "text-red-600" },
    { icon: FileCode, text: "Write, refactor, delete... then re-write better", color: "text-green-600" },
    { icon: Github, text: "Push commits like it's cardio 💪", color: "text-gray-700" }
  ];

  const funFacts = [
    { label: "Fav Debug Trick", value: 'console.log("Still alive")', icon: Terminal },
    { label: "Most Googled", value: "How to center a div", icon: Lightbulb },
    { label: "IDE Theme", value: "Darker than my humor", icon: Cpu },
    { label: "Languages I speak", value: "JS, TS, Hinglish, and Emoji 😎", icon: Code }
  ];
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section with Image */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-3xl p-8 shadow-2xl mb-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Image Section */}
              <div className="relative group">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 p-1 hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-6xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                     <Image alt="Aryan Barfa" src="/profile.jpg" width={192} height={192} className="rounded-full object-top group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-4 right-4 animate-bounce">
                        <span className="text-2xl">{emojis[currentEmoji]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Intro Text */}
              <div className="text-center lg:text-left flex-1">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <Info className="text-indigo-600 w-8 h-8 animate-pulse" />
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Aryan Barfa
                  </h1>
                </div>
                <div className="mb-4">
                  <p className="text-xl text-gray-600 font-medium">👨‍💻 Who Am I?</p>
                  <p className="text-2xl font-bold text-indigo-800 min-h-[2rem]">
                    {typedText}<span className="animate-pulse">|</span>
                  </p>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I&apos;m a full-stack developer, bug hunter, and chaos-powered UI crafter with a love for pixels, puns, and pushing to GitHub at 3AM.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personality Section */}
        <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-3xl p-8 shadow-xl mb-8 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Zap className="text-white w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-purple-700">🚀 My Dev Personality</h2>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <p className="text-lg text-gray-700 leading-relaxed">
                More than just a coder — I&apos;m a blend of creativity, caffeine, and Ctrl+Z. I don&apos;t just build things that work; 
                I build things that <span className="font-bold text-purple-600 animate-pulse">vibe</span>. Whether it&apos;s crafting smooth UIs or surviving JS errors, 
                I do it with <span className="inline-flex items-center gap-1 font-semibold text-pink-600">
                  <Sparkles className="w-4 h-4" />style and snacks<Sparkles className="w-4 h-4" />
                </span>.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-3xl p-8 shadow-xl mb-8 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Code className="text-white w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-blue-700">🧠 Things I Do (and Break)</h2>
            </div>
            <div className="grid gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:scale-105 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                    <skill.icon className={`w-5 h-5 ${skill.color}`} />
                  </div>
                  <span className="text-gray-700 font-medium flex-1">{skill.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Developer Mode Section */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-3xl p-8 shadow-xl mb-8 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <Terminal className="text-white w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-green-700">😜 Developer Mode: ON</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {funFacts.map((fact, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 border border-green-100 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <fact.icon className="w-5 h-5 text-green-600 group-hover:animate-pulse" />
                    <span className="font-semibold text-green-700">{fact.label}:</span>
                  </div>
                  <span className="text-gray-700 font-mono text-sm bg-white px-3 py-1 rounded-full inline-block">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Funny About Section */}
        <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-8 shadow-xl mb-8 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Heart className="text-white w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-orange-700">👾 The Real Me</h2>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <p className="text-gray-700 leading-relaxed mb-4">
                I&apos;m not your average tech bro. I&apos;m the <span className="font-mono bg-gray-200 px-2 py-1 rounded">.script</span> your browser warns about 😅, 
                the guy who talks to bugs like they owe him rent, and the dev who styles life with Tailwind and troubles with dark humor.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-xl p-4 border border-orange-100">
                  <h4 className="font-bold text-orange-700 mb-2">💥 Strengths:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>⚡ Blazing-fast Ctrl+Z reflexes</li>
                    <li>🔥 Deadly puns</li>
                    <li>🧠 Creative logic with madness</li>
                    <li>⌨️ Keyboard-scaring typing speed</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-orange-100">
                  <h4 className="font-bold text-red-700 mb-2">💀 Weaknesses:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>🍕 Bad me samjhenge </li>
                    <li>🌙 &quot;Bas 10 minute aur&quot; since 2018</li>
                    <li>🧃 Tapping F5 like life source</li>
                    <li>🌪️ Spaghetti code called &quot;clean&quot;</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">📫 Let&apos;s Connect!</h2>
              <p className="text-xl mb-8 text-indigo-100">
                Want to collab, hire, roast code together, or just share memes? Let&apos;s connect! 👇
              </p>
             
              <div className="flex justify-center gap-6">
                <div className="group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer hover:scale-110">
                    <Link href="https://github.com/Aryanshub">
                      <Github className="w-8 h-8 text-white group-hover:animate-bounce" />
                    </Link>
                  </div>
                  <p className="text-sm mt-2 text-indigo-200">GitHub</p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer hover:scale-110">
                    <Linkedin className="w-8 h-8 text-white group-hover:animate-bounce" />
                  </div>
                  <p className="text-sm mt-2 text-indigo-200">LinkedIn</p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer hover:scale-110">
                    <Mail className="w-8 h-8 text-white group-hover:animate-bounce" />
                  </div>
                  <p className="text-sm mt-2 text-indigo-200">Email</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}