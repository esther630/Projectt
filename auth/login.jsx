import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Eye, EyeOff } from "lucide-react";


export function LoginPage() {
  // Add these state variables at the top so the form doesn't crash
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
   const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "reader" });
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
     alert("Email & password required");
     return;
    }

    try {
      const res = await axios.post("http://localhost/project/PHP/login.php", { email, password });
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify({ name: res.data.full_name, username: res.data.username }));
        setUser({ name: res.data.full_name, username: res.data.username });
        navigate("/"); // ✅ redirect to home after login
        alert("Login successful!");

      } else alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error during login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

    return (
    <div>
      <header>
        {/* If user is logged in, show welcome message and logout button */}
      
          <>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">

          <div className="w-full max-w-md ">
           <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
                    ← Back to Home
                  </Link>
          {/*card replacement */}
           <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="p-6 text-center border-b border-gray-100">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#b13a2d] mb-4">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-serif text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to your MAWU account</p>
          </div>

            <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Email</label>
            <input name="email" className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b13a2d]"
                  placeholder="you@example.com"
                   onChange={handleChange} required/>
            </div>

             <div className="space-y-2">
             <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Password</label>
                  <a href="#" className="text-xs text-[#b13a2d] hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                <input name="password" className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b13a2d]"
                    placeholder="Enter your password"
                     type="password" onChange={handleChange} /><br></br>

                </div>
            </div>
          
            <button type="submit" 
            className="w-full bg-[#b13a2d] text-white py-2 rounded-md hover:bg-[#8e2e24] transition-colors"
            onClick={handleLogin}>sign In </button>

             <div className="mt-6 text-center text-sm">
                          <span className="text-gray-500">Don't have an account? </span>
                          <Link to="/auth/register" className="text-[#b13a2d] hover:underline font-medium">
                            Sign up
                          </Link>
                        </div>
                        </div>  
            </div>
            </div>
          </>
       
      </header>
    </div>
  );
}
 export default LoginPage;
 