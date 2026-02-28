"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const RegisterContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nid: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(formData.password)) {
      setError("Password must be 6+ chars, 1 uppercase, 1 lowercase.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful! Please Login.");
        const redirectPath = searchParams.get("redirect");
        const loginPath = redirectPath
          ? `/login?redirect=${encodeURIComponent(redirectPath)}`
          : "/login";
        router.push(loginPath);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    const redirectPath = searchParams.get("redirect") || "/";
    window.location.href = `/api/auth/google/start?redirect=${encodeURIComponent(redirectPath)}`;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join{" "}
            <span className="text-emerald-600 font-semibold">Care.xyz</span> to
            find reliable care services
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 animate-pulse">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 transition-all"
                placeholder="Your Full Name"
              />
            </div>

            {/* NID Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                NID Number
              </label>
              <input
                name="nid"
                type="text"
                required
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 transition-all"
                placeholder="Your NID Number"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 transition-all"
                placeholder="example@mail.com"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact No
              </label>
              <input
                name="contact"
                type="text"
                required
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 transition-all"
                placeholder="017XXXXXXXX"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-gray-400 hover:text-emerald-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Must be 6+ chars, 1 uppercase, 1 lowercase.
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-md ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 uppercase">Or</span>
            </div>
          </div>
          {/* Social Register */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
            >
              <FaGoogle className="text-red-500 text-lg" />
              <span>Sign up with Google</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href={
              searchParams.get("redirect")
                ? `/login?redirect=${encodeURIComponent(searchParams.get("redirect"))}`
                : "/login"
            }
            className="font-bold text-emerald-600 hover:text-emerald-500 underline-offset-4 hover:underline transition-all"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-64px)] bg-gray-50" />}>
      <RegisterContent />
    </Suspense>
  );
}
