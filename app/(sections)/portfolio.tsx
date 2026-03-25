// app/(sections)/portfolio.tsx

import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

async function getProjects() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(projects));
}

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-3xl font-bold text-center mb-10">
          My Portfolio
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          
          {projects.length === 0 && (
            <p className="text-center col-span-3">
              No projects found.
            </p>
          )}

          {projects.map((project: any) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.techStack?.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-4">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      className="text-blue-500 text-sm"
                    >
                      Live
                    </a>
                  )}

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      className="text-gray-700 text-sm"
                    >
                      GitHub
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}