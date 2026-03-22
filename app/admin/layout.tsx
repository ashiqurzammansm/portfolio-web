// app/admin/layout.tsx

import React from "react";
import AdminTopbar from "./topbar";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ✅ SIDEBAR (ONLY NAVIGATION) */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">

        <div className="p-4 text-lg font-semibold border-b border-gray-700">
          Admin Dashboard
        </div>

        <nav className="flex-1 p-4 space-y-1 text-sm">

          <a href="/admin" className="block px-3 py-2 rounded hover:bg-gray-800">
            Dashboard
          </a>

          <a href="/admin/projects" className="block px-3 py-2 rounded hover:bg-gray-800">
            Projects
          </a>

          <a href="/admin/messages" className="block px-3 py-2 rounded hover:bg-gray-800">
            Messages
          </a>

          <a href="/admin/settings" className="block px-3 py-2 rounded hover:bg-gray-800">
            Settings
          </a>

        </nav>

        <div className="p-4 text-xs border-t border-gray-700 text-gray-400">
          Admin Panel v1.0
        </div>
      </aside>

      {/* ✅ MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* Topbar (no navbar duplication) */}
        <AdminTopbar />

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}