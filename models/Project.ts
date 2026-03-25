// models/Project.ts

import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    techStack: [String],
    liveLink: String,
    githubLink: String,
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);