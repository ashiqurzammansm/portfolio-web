// app/admin/projects/page.tsx

"use client";

import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
  });

  const fetchProjects = async () => {
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/admin/projects", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        techStack: form.techStack.split(","),
      }),
    });

    setForm({
      title: "",
      description: "",
      image: "",
      techStack: "",
      liveLink: "",
      githubLink: "",
    });

    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
    });
    fetchProjects();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Projects</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-2 mb-6">
        <input placeholder="Title" className="border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input placeholder="Description" className="border p-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input placeholder="Image URL" className="border p-2"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input placeholder="Tech (comma separated)" className="border p-2"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
        />
        <input placeholder="Live Link" className="border p-2"
          value={form.liveLink}
          onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
        />
        <input placeholder="GitHub Link" className="border p-2"
          value={form.githubLink}
          onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
        />

        <button className="bg-black text-white p-2 rounded">
          Add Project
        </button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p._id} className="p-4 bg-white rounded shadow">
            <h2 className="font-bold">{p.title}</h2>
            <p>{p.description}</p>
            <button
              onClick={() => handleDelete(p._id)}
              className="mt-2 text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}