// app/(sections)/certifications.tsx

import { connectDB } from "@/lib/db";
import Certification from "@/models/Certification";

async function getCertifications() {
  await connectDB();
  const data = await Certification.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(data));
}

export default async function Certifications() {
  const certifications = await getCertifications();

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">

        {/* KEEP YOUR ORIGINAL HEADING STYLE */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Certifications & Training
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {certifications.length === 0 && (
            <p className="text-center col-span-2">
              No certifications found.
            </p>
          )}

          {certifications.map((item: any) => (
            <div
              key={item._id}
              className="bg-gray-100 dark:bg-slate-900 p-5 rounded-lg shadow"
            >

              {/* TITLE */}
              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              {/* AUTHORITY */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {item.authority}
              </p>

              {/* DATE LOGIC */}
              <p className="text-sm mt-2">
                {item.issueDate
                  ? `Completed: ${item.issueDate}`
                  : `Expected: ${item.expectedDate}`}
              </p>

              {/* ACTION LINKS */}
              <div className="flex gap-4 mt-4 text-sm">

                {item.certificateUrl && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    View Certificate
                  </a>
                )}

                {item.verifyUrl && (
                  <a
                    href={item.verifyUrl}
                    target="_blank"
                    className="text-green-500 hover:underline"
                  >
                    Verify
                  </a>
                )}

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}