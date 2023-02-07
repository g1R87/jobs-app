import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required!"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Position is required!"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", //refrencing user model for mongoose type
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true } //createdAt and updatedAt automatically
);

export default mongoose.model("Job", JobsSchema);
