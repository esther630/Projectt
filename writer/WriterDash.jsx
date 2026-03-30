import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "./dashvavigation.jsx";
import {
  BookOpen, Eye, DollarSign, FileText, TrendingUp,
  ArrowUpRight, Clock, CheckCircle, AlertCircle, PenTool,
} from "lucide-react";

const statusLabels = {
  approved: "Approved",
  pending: "Pending",
  in_review: "In Review",
  revision_requested: "Revision Requested",
  rejected: "Rejected",
};

const getStatusIcon = (status) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
    case "in_review":
      return <Clock className="h-4 w-4 text-amber-600" />;
    case "revision_requested":
    case "rejected":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "approved":      return "bg-green-100 text-green-800";
    case "pending":       return "bg-amber-100 text-amber-800";
    case "in_review":     return "bg-blue-100 text-blue-800";
    case "revision_requested": return "bg-orange-100 text-orange-800";
    case "rejected":      return "bg-red-100 text-red-800";
    default:              return "";
  }
};

export function WriterDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      alert("You must be logged in to access this page.");
      navigate("/auth/login");
      return;
    }

   const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
     alert("Email & password required");
     return;
    }

    try {
      const res = await axios.post("http://localhost/project/PHP/login_writer.php", { email, password });
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify({ name: res.data.full_name, username: res.data.username }));
        setUser({ name: res.data.full_name, username: res.data.username });
        navigate("/"); 
        alert("Login successful!");

      } else alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error during login");
    }
  };
  }, []);

  // Don't render anything until role check passes
  if (!user) return null;

  const writerBooks = [];
  const writerSubmissions = [];

  return (
    <DashboardLayout type="writer">
      <div className="space-y-6 bg-[#FAF8F5]">

        {/* Welcome Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Welcome back, {user.name.split(" ")[0]}!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your books today.
            </p>
            <button className="h-8 justify-center items-center rounded-md gap-1.5 px-3 text-white text-sm font-medium bg-[#b13a2d]">
              <Link to="/writer/writerstudio" className="flex items-center">
                <PenTool className="mr-2 h-4 w-4" />
                Start Writing
              </Link>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-[#FFFFFF]">
          <div className="p-4 border rounded-lg">
            <Eye />
            <p>Total Reads</p>
          </div>
          <div className="p-4 border rounded-lg">
            <DollarSign />
            <p>Revenue (MWK)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <BookOpen />
            <p>Published Books</p>
          </div>
          <div className="p-4 border rounded-lg">
            <FileText />
            <p>Pending Reviews</p>
          </div>
        </div>

        {/* Membership */}
        <div className="p-4 border rounded-lg bg-[#F6EFEB]">
          <p>Membership: {user.membershipType ?? "Writer"} (Active)</p>
          {user.membershipExpiry && (
            <p>Expires: {new Date(user.membershipExpiry).toLocaleDateString()}</p>
          )}
        </div>

        {/* Submissions */}
        <div className="p-4 border rounded-lg bg-[#FFFFFF]">
          <div className="flex flex-row items-center justify-between mb-2">
            <h3 className="font-bold">Recent Submissions</h3>
            <Link to="/writer/submissions" className="flex items-center text-sm text-[#b13a2d]">
              <ArrowUpRight className="h-4 w-4 mr-1" /> View all
            </Link>
          </div>

          {writerSubmissions.length > 0 ? (
            writerSubmissions.map((sub) => (
              <div key={sub.id} className="flex justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  {getStatusIcon(sub.status)}
                  <span>{sub.title}</span>
                </div>
                <span className={getStatusColor(sub.status)}>
                  {statusLabels[sub.status]}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No submissions yet.</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-[#FFFFFF]">
          <button className="p-4 border rounded-lg flex flex-col items-center">
            <PenTool />
            Write New Story
          </button>
          <button className="p-4 border rounded-lg flex flex-col items-center">
            <FileText />
            Submit for Review
          </button>
          <button className="p-4 border rounded-lg flex flex-col items-center">
            <TrendingUp />
            View Analytics
          </button>
          <button className="p-4 border rounded-lg flex flex-col items-center">
            <DollarSign />
            Check Earnings
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default WriterDashboardPage;