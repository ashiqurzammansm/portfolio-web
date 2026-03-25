// app/admin/certifications/page.tsx

"use client";

import { useEffect, useState } from "react";

export default function CertificationsPage() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    authority: "",
    institute: "",
    issueDate: "",
    expectedDate: "",
    certificateUrl: "",
    verifyUrl: "",
  });

  const fetchData = async () => {
    const res = await fetch("/api/admin/certifications");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reset = () => {
    setForm({
      title: "",
      authority: "",
      institute: "",
      issueDate: "",
      expectedDate: "",
      certificateUrl: "",
      verifyUrl: "",
    });
    setError("");
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setForm((prev) => ({
      ...prev,
      certificateUrl: data.url,
    }));

    setUploading(false);
  };

  const validateForm = () => {
    if (!form.title || !form.authority || !form.institute) {
      return "All basic fields are required";
    }

    if (!form.issueDate && !form.expectedDate) {
      return "Select either Issue Date or Expected Date";
    }

    if (form.issueDate && form.expectedDate) {
      return "Only one date allowed";
    }

    if (form.issueDate && !form.certificateUrl) {
      return "Completed certification requires file upload or link";
    }

    return "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const err = validateForm();
    if (err) return setError(err);

    await fetch("/api/admin/certifications", {
      method: "POST",
      body: JSON.stringify(form),
    });

    reset();
    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Certifications & Training</h1>
        <p className="text-sm text-gray-500">
          Manage your certifications professionally
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">Certificate Name</label>
              <input
                className="border p-2 w-full rounded"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Issuing Authority</label>
              <input
                className="border p-2 w-full rounded"
                value={form.authority}
                onChange={(e) => setForm({ ...form, authority: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Institute</label>
              <input
                className="border p-2 w-full rounded"
                value={form.institute}
                onChange={(e) => setForm({ ...form, institute: e.target.value })}
              />
            </div>

          </div>

          {/* DATE SECTION */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">
                Issue Date (Completed)
              </label>
              <input
                type="date"
                className="border p-2 w-full rounded"
                value={form.issueDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    issueDate: e.target.value,
                    expectedDate: "",
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Expected Date (Ongoing)
              </label>
              <input
                type="date"
                className="border p-2 w-full rounded"
                value={form.expectedDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    expectedDate: e.target.value,
                    issueDate: "",
                  })
                }
              />
            </div>

          </div>

          {/* FILE / LINK */}
          <div className="space-y-3">

            <label className="text-sm font-medium">
              Upload Certificate OR Add Link
            </label>

            <input
              type="file"
              className="border p-2 w-full rounded"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleUpload(e.target.files[0]);
                }
              }}
            />

            {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}

            {form.certificateUrl && (
              <p className="text-green-600 text-sm">
                ✔ File uploaded / link added
              </p>
            )}

            <input
              placeholder="Or paste certificate URL"
              className="border p-2 w-full rounded"
              value={form.certificateUrl}
              onChange={(e) =>
                setForm({ ...form, certificateUrl: e.target.value })
              }
            />

            <input
              placeholder="Verify URL (optional)"
              className="border p-2 w-full rounded"
              value={form.verifyUrl}
              onChange={(e) =>
                setForm({ ...form, verifyUrl: e.target.value })
              }
            />

          </div>

          <button className="bg-black text-white px-4 py-2 rounded">
            Add Certification
          </button>

        </form>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">

        {data.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded-xl shadow">

            <div className="flex justify-between items-start">
              <h2 className="font-semibold">{c.title}</h2>

              <span className={`text-xs px-2 py-1 rounded 
                ${c.issueDate ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                {c.issueDate ? "Completed" : "Ongoing"}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              {c.authority} • {c.institute}
            </p>

            <p className="text-sm mt-1">
              {c.issueDate || c.expectedDate}
            </p>

            <div className="flex gap-3 mt-3 text-sm">
              {c.certificateUrl && (
                <a href={c.certificateUrl} target="_blank" className="text-blue-500">
                  View
                </a>
              )}
              {c.verifyUrl && (
                <a href={c.verifyUrl} target="_blank" className="text-green-500">
                  Verify
                </a>
              )}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}