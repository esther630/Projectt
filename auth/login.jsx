 import React from "react";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
    import { Link } from "react-router-dom";
 import { ErrorBoundary } from "react-error-boundary";
 import { ArrowLeft, BookOpen, Eye, EyeOff } from "lucide-react";
import { useState } from "react";





export function LoginPage() {
  // Add these state variables at the top so the form doesn't crash
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
          ← Back to Home
        </Link>

        {/* This replaces <Card> */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          
          {/* This replaces <CardHeader> */}
          <div className="p-6 text-center border-b border-gray-100">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#b13a2d] mb-4">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-serif text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to your MAWU account</p>
          </div>

          {/* This replaces <CardContent> */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b13a2d]"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Password</label>
                  <a href="#" className="text-xs text-[#b13a2d] hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b13a2d]"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#b13a2d] text-white py-2 rounded-md hover:bg-[#8e2e24] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-500">Don't have an account? </span>
              <Link to="/auth/register" className="text-[#b13a2d] hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

 export default LoginPage;
 