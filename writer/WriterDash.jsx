import React from "react";
import DashboardLayout from "./dashvavigation.jsx";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Eye,
  DollarSign,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  PenTool,
} from "lucide-react";

// Mock data (keep or replace with your API later)
const currentWriter = {
  id: 1,
  name: "John Doe",
  membershipType: "premium",
  membershipExpiry: "2026-12-31",
};

const writerBooks = [];
const writerSubmissions = [];

const statusLabels = {
  approved: "Approved",
  pending: "Pending",
  in_review: "In Review",
  revision_requested: "Revision Requested",
  rejected: "Rejected",
};

// Status icon helper
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

// Status color helper
const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "in_review":
      return "bg-blue-100 text-blue-800";
    case "revision_requested":
      return "bg-orange-100 text-orange-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

export  function WriterDashboardPage() {


  return (
          
    <DashboardLayout type="writer">
    <div className="space-y-6 bg-[#FAF8F5]">


      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Welcome back, {currentWriter.name.split(" ")[0]}!
        </h2>
        <p  className="text-muted-foreground"> Here&apos;s what&apos;s happening with your books today.</p>

        <button className="h-8 justify-center items-center rounded-md gap-1.5 px-3 text-white text-sm font-medium bg-[#b13a2d]">
            <Link href="/dashboard/writer/editor ">
              <PenTool className="mr-2 h-4 w-4  " />
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
        <p>
          Membership: {currentWriter.membershipType} Writer (Active)
        </p>
        <p>
          Expires:{" "}
          {new Date(currentWriter.membershipExpiry).toLocaleDateString()}
        </p>
      </div>

      {/* Submissions */}
      <div className="p-4 border rounded-lg bg-[#FFFFFF] flex flex-row items-center justify-between">
        <h3 className="font-bold mb-2">Recent Submissions</h3>

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
        
          <p><ArrowUpRight/>view-all</p>
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