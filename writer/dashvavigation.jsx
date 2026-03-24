import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  BookOpen,
  LayoutDashboard,
  FileText,
  BarChart3,
  DollarSign,
  Sparkles,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Flag,
  FileCheck,
  ChevronLeft,
} from "lucide-react";

const writerNavItems = [
  { name: "Dashboard", href: "/writer/writerDash", icon: LayoutDashboard },
  { name: "My Books", href: "/writer/books", icon: BookOpen },
  { name: "Submissions", href: "/writer/submissions", icon: FileText },
  { name: "Analytics", href: "/writer/analytics", icon: BarChart3 },
  { name: "Earnings", href: "/writer/earnings", icon: DollarSign },
  { name: "AI Editor", href: "/writer/editor", icon: Sparkles },
  { name: "Settings", href: "/writer/settings", icon: Settings },
];

const editorNavItems = [
  { name: "Dashboard", href: "/dashboard/editor", icon: LayoutDashboard },
  { name: "Submissions Queue", href: "/dashboard/editor/submissions", icon: FileCheck },
  { name: "Members", href: "/dashboard/editor/members", icon: Users },
  { name: "Flagged Content", href: "/dashboard/editor/flagged", icon: Flag },
  { name: "Reports", href: "/dashboard/editor/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/editor/settings", icon: Settings },
];

export function DashboardLayout({ children, type }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = type === "writer" ? writerNavItems : editorNavItems;
  const title = type === "writer" ? "Writer Dashboard" : "Editor Dashboard";

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      {/* Mobile Sidebar Overlay */}

      
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[black/50] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className=
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#1A1311] text-sidebar-foreground transition-transform lg:static lg:translate-x-0 text-[#F1EEE7]"
        
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4 ">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-bold">MAWU</span>
          </Link>
          <button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-auto p-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-sidebar-foreground/60">
            {title}
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className=
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-sidebar-border p-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Site
          </Link>
          <button
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
            <input type="color" name="" id="" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 lg:px-6">
          <button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </div>
        </header>

       

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>

    
  );
}

export default DashboardLayout;