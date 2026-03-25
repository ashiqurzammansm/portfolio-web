// app/admin/topbar.tsx

"use client";

import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
  };

  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="font-semibold">Admin Dashboard</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Logout
      </button>
    </header>
  );
}