import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: { type: String, required: [true, "Password is required"] },
    dob: { type: String, required: [true, "Date of birth is required"] },
    gender: { type: String, required: [true, "Gender is required"] },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    claims: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Claim", default: [] },
    ],
    reports: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Report", default: [] },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
