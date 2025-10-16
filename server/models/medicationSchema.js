import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    // Reference to the user (patient) who owns this medication record
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ Linked to your User model (patient)
      required: true,
    },

    // Medication details
    medicationName: {
      type: String,
      required: [true, "Medication name is required"],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, "Dosage information is required"],
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },

   
    prescribedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    notes: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Medication", medicationSchema);
