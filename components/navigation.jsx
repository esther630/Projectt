"use client";
import {react, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Use react-router-dom instead of next/navigation
import { BookOpen, Menu, X, LogIn, ChevronDown, Home, PenTool, MessageSquare, Users } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Browse Books", href: "/browse", icon: BookOpen },
  { name: "Writers", href: "/writers", icon: PenTool },
  { name: "Forum", href: "/forum", icon: MessageSquare },
  { name: "About", href: "/about", icon: Users },
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [user, setUser] = useState(null);

useEffect(() => {
  const stored = localStorage.getItem("user");
  if (stored) setUser(JSON.parse(stored));
}, []);

const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
};

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b13a2d]">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold">MAWU</span>
            <span className="text-xs text-gray-500">Writers Union</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.href ? "bg-red-50 text-[#b13a2d]" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Dashboard Dropdown (Simple version) */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Dashboard <ChevronDown className="h-4 w-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-lg p-2">
                <Link to="/dashboard/writer" className="block px-4 py-2 hover:bg-gray-50 rounded-md">
                  <span className="font-medium text-sm">Writer Dashboard</span>
                </Link>
                <Link to="/dashboard/editor" className="block px-4 py-2 hover:bg-gray-50 rounded-md">
                  <span className="font-medium text-sm">Editor Dashboard</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Auth Buttons */}

        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Hello, {user.name}</span>
            <button onClick={handleLogout} className="px-4 py-2 text-sm font-small bg-[#b13a2d] text-white rounded-md hover:bg-[#8e2e24] transition-colors">
              Logout
            </button>
          </div>
        ) : (
        <div className="hidden md:flex items-center gap-2">
          <Link to="/auth/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black">
            Sign In
          </Link>
          <Link to="/auth/Register" className="px-4 py-2 text-sm font-medium bg-[#b13a2d] text-white rounded-md hover:bg-[#8e2e24]">
            Register
          </Link>
        </div>
)};
        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
      </nav>
    </header>
  );
}
export default Navigation;
