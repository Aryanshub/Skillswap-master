"use client";
import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputElement } from "./Signup";
import toast from "react-hot-toast";
import Link from "next/link";
import { Signin } from "@/app/actions/Auth";


const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side before accessing localStorage
    setIsClient(true);
    
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const user = await Signin({ email, password });
      
      if (!user || typeof user === "string") {
        toast.error("Invalid credentials. Please try again.");
        return;
      }

      // Store token
      localStorage.setItem("token", user.token);
      
      // Show success message
      toast.success(`Welcome back, ${user.user.name}!`);
      
      // Navigate to posts page
      router.push("/posts");
      
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Show loading state while checking authentication
  if (!isClient) {
    return (
      <div className="w-full max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Welcome Back
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-blue-600 font-semibold hover:underline transition-all duration-200"
        >
          Sign up here
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputElement
          label="Email"
          inputname="email"
          type="email"
          value={email}
          handler={(e) => setEmail(e.target.value)}
          required
        />
        
        <InputElement
          label="Password"
          inputname="password"
          type="password"
          value={password}
          handler={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading || !email.trim() || !password.trim()}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 
                   disabled:bg-gray-400 disabled:cursor-not-allowed 
                   transition duration-200 font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Logging in...
            </div>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      
    </div>
  );
};

export default Login;