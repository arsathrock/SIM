import mongoose from "mongoose";

const StudentProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    becoming: {
      type: String,
      required: true,
    },

    fear: {
      type: String,
      required: true,
    },

    stoppedBy: {
      type: String,
      required: true,
    },

    studentType: {
      type: String,
      required: true,
    },

    realizationTrigger: {
      type: String,
      required: true,
    },

    dream: {
      type: String,
      required: true,
    },

    quote: {
      type: String,
      required: true,
    },

    firstVictory: {
      type: String,
      default: "",
    },

    coreDrive: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StudentProfile", StudentProfileSchema);