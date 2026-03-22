// app/admin/messages/page.tsx

"use client";

import { useEffect, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = async () => {
    const res = await fetch("/api/admin/messages");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PUT",
    });
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
    });
    fetchMessages();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`p-4 rounded shadow ${
              m.isRead ? "bg-gray-100" : "bg-white"
            }`}
          >
            <h2 className="font-bold">{m.name}</h2>
            <p className="text-sm text-gray-600">{m.email}</p>
            <p className="mt-2">{m.message}</p>

            <div className="flex gap-3 mt-3">
              {!m.isRead && (
                <button
                  onClick={() => markAsRead(m._id)}
                  className="text-blue-500"
                >
                  Mark as Read
                </button>
              )}

              <button
                onClick={() => handleDelete(m._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}