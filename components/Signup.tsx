"use client";

import { useState, FormEvent, ChangeEventHandler, useEffect } from "react";
import { Signup } from "@/app/actions/Auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  useEffect(() => {
    // Ensure we're on the client side before accessing localStorage
    setIsClient(true);
    
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name must be less than 50 characters";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
    return "";
  };

  const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setLoading(true);

    try {
      const user = await Signup({ name: name.trim(), email: email.trim(), password });
      
      if (!user || typeof user === "string") {
        toast.error("Signup failed. Please try again.");
        return;
      }

      // Store token
      localStorage.setItem("token", user.token);
      
      // Show success message
      toast.success(`Welcome ${user.user.name}! Your account has been created.`);
      
      // Navigate to home page
      router.push("/");
      
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle specific error messages
      if (error?.message?.includes("email")) {
        toast.error("Email already exists. Please use a different email.");
      } else if (error?.message?.includes("password")) {
        toast.error("Password requirements not met.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }

    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        // Re-validate confirm password if it's already filled
        if (confirmPassword) {
          setErrors(prev => ({ 
            ...prev, 
            confirmPassword: validateConfirmPassword(confirmPassword, value) 
          }));
        }
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };

  const isFormValid = () => {
    return name.trim() && 
           email.trim() && 
           password && 
           confirmPassword &&
           !Object.values(errors).some(error => error !== "");
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
        Create Your Account
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="text-blue-600 font-semibold hover:underline transition-all duration-200"
        >
          Sign in here
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputElement
          label="Full Name"
          inputname="name"
          type="text"
          value={name}
          handler={(e) => handleInputChange("name", e.target.value)}
          error={errors.name}
          placeholder="Enter your full name"
        />

        <InputElement
          label="Email Address"
          inputname="email"
          type="email"
          value={email}
          handler={(e) => handleInputChange("email", e.target.value)}
          error={errors.email}
          placeholder="Enter your email address"
        />

        <InputElement
          label="Password"
          inputname="password"
          type="password"
          value={password}
          handler={(e) => handleInputChange("password", e.target.value)}
          error={errors.password}
          placeholder="Create a strong password"
        />

        <InputElement
          label="Confirm Password"
          inputname="confirmPassword"
          type="password"
          value={confirmPassword}
          handler={(e) => handleInputChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
        />

        <div className="text-xs text-gray-500 mt-2">
          Password must contain at least 8 characters with uppercase, lowercase, and numbers.
        </div>

        <button
          type="submit"
          disabled={loading || !isFormValid()}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 
                   disabled:bg-gray-400 disabled:cursor-not-allowed 
                   transition duration-200 font-medium mt-6"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-gray-500">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export const InputElement = ({
  label,
  inputname,
  type,
  value,
  handler,
  error,
  placeholder,
  required = true,
}: InputElementType) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        name={inputname}
        type={type}
        required={required}
        placeholder={placeholder}
        className={`mt-1 w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 transition-colors
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-blue-500'
          }`}
        value={value}
        onChange={handler}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

interface InputElementType {
  label: string;
  inputname: string;
  type: string;
  value: string;
  handler: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  required?: boolean;
}