// models/Certification.ts

import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
    title: String,
    authority: String,
    institute: String, // ✅ NEW
    issueDate: String,
    expectedDate: String,
    certificateUrl: String,
    verifyUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Certification ||
  mongoose.model("Certification", CertificationSchema);