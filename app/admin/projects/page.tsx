// app/admin/projects/page.tsx

"use client";

import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      techStack: "",
      liveLink: "",
      githubLink: "",
    });
    setEditingId(null);
  };

  // ✅ IMAGE UPLOAD HANDLER
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setForm((prev) => ({ ...prev, image: data.url }));
    setUploading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      ...form,
      techStack: form.techStack.split(","),
    };

    if (editingId) {
      await fetch(`/api/admin/projects/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchProjects();
  };

  const handleEdit = (project: any) => {
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      techStack: project.techStack?.join(",") || "",
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
    });
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

      <form onSubmit={handleSubmit} className="grid gap-2 mb-6">

        <input
          placeholder="Title"
          className="border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Description"
          className="border p-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* ✅ IMAGE URL INPUT */}
        <input
          placeholder="Paste Image URL (optional)"
          className="border p-2"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {/* ✅ FILE UPLOAD */}
        <input
          type="file"
          className="border p-2"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleImageUpload(e.target.files[0]);
            }
          }}
        />

        {uploading && <p className="text-sm text-blue-500">Uploading...</p>}

        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-32 h-20 object-cover rounded"
          />
        )}

        <input
          placeholder="Tech (comma separated)"
          className="border p-2"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
        />

        <input
          placeholder="Live Link"
          className="border p-2"
          value={form.liveLink}
          onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
        />

        <input
          placeholder="GitHub Link"
          className="border p-2"
          value={form.githubLink}
          onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
        />

        <div className="flex gap-2">
          <button className="bg-black text-white p-2 rounded">
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 p-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p._id} className="p-4 bg-white rounded shadow">
            <h2 className="font-bold">{p.title}</h2>
            <p>{p.description}</p>

            <div className="flex gap-3 mt-2">
              <button onClick={() => handleEdit(p)} className="text-blue-500">
                Edit
              </button>

              <button onClick={() => handleDelete(p._id)} className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}