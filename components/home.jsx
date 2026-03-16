import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../auth/login";
import { 
  BookOpen, 
  PenTool, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe, 
  ArrowRight,
  MessageSquare,
  Award,
  Star
} from "lucide-react";

// --- MOCK DATA (Internalized so the code runs immediately) ---
const features = [
  {
    icon: PenTool,
    title: "AI Writing Assistant",
    description: "Get help with grammar, spelling, and style in English, Chichewa, or Tumbuka.",
  },
  {
    icon: TrendingUp,
    title: "Quality-Based Ranking",
    description: "Books ranked by reader engagement. Great writing gets discovered.",
  },
  {
    icon: Shield,
    title: "Copyright Protection",
    description: "Your work is protected through our partnership with COSOMA.",
  },
  {
    icon: Globe,
    title: "Multiple Languages",
    description: "Write and read in English, Chichewa, Tumbuka, and Yao.",
  },
];

const stats = [
  { value: "850+", label: "Active Writers" },
  { value: "2,500+", label: "Published Works" },
  { value: "50,000+", label: "Monthly Readers" },
  { value: "4", label: "Languages Supported" },
];

// --- STYLED COMPONENTS (Replacing Shadcn for portability) ---
const CustomButton = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClass = "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[#b13a2d] text-white hover:bg-[#8e2e24] focus:ring-[#b13a2d]",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
  };
  return (

    
    <a className={`${baseClass} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fdfcf9] text-[#1a1a1a] font-sans">
      

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#b13a2d]/5 to-transparent pt-20 pb-28">
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-[#b13a2d] bg-[#b13a2d]/10 rounded-full">
            Malawi Writers Union Digital Library
          </span>
          <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-7xl mb-6">
            Discover the Heart of <br />
            <span className="text-[#b13a2d]">Malawian Literature</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-10 leading-relaxed">
            A platform for writers to publish, readers to discover, and communities to connect
            through the power of Malawian storytelling.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CustomButton href="/browse">
              <BookOpen className="mr-2 h-5 w-5" /> Start Reading
            </CustomButton>
            <CustomButton href="/auth/login" variant="outline">
              <PenTool className="mr-2 h-5 w-5" /> Join as Writer
       
            </CustomButton>
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-[#b13a2d] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">Why Choose MAWU?</h2>
          <p className="mt-4 text-gray-500">Everything you need to write, publish, and discover great literature</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="p-8 bg-white border border-gray-100 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b13a2d]/10 mb-6">
                <feature.icon className="h-6 w-6 text-[#b13a2d]" />
              </div>
              <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#b13a2d] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Join over 850 writers sharing their stories with readers across Malawi.
            Access our AI editor, copyright protection, and a global audience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CustomButton href="/register" variant="secondary" className="w-full sm:w-auto">
              Become a Member
            </CustomButton>
            <CustomButton href="/about" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto" variant="outline">
              Learn More
            </CustomButton>
          </div>
        </div>
      </section>

    </div>
  );
}