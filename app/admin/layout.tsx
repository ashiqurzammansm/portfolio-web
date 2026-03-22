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
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a href="/admin" className="block hover:bg-gray-800 p-2 rounded">
            Dashboard
          </a>
          <a href="/admin/projects" className="block hover:bg-gray-800 p-2 rounded">
            Projects
          </a>
          <a href="/admin/messages" className="block hover:bg-gray-800 p-2 rounded">
            Messages
          </a>
          <a href="/admin/settings" className="block hover:bg-gray-800 p-2 rounded">
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-gray-700 text-sm">
          © Admin
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* ✅ CLIENT COMPONENT HERE */}
        <AdminTopbar />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}