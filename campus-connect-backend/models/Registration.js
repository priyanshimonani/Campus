import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    }
  },
  { timestamps: true }
);

// 🚫 Prevent duplicate registration
registrationSchema.index(
  { studentId: 1, eventId: 1 },
  { unique: true }
);

export default mongoose.model("Registration", registrationSchema);
