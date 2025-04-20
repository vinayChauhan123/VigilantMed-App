import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientName: { type: String, required: true },
    hospitalName: { type: String, required: true },
    diagnosis: { type: Array, required: true },
    physician: { type: String, required: true },
    procedure: { type: Array, required: true },
    admissionDate: { type: Date, required: true },
    dischargeDate: { type: Date, required: true },
    totalBill: { type: Number, required: true },
    insuranceProvider: { type: String, required: true },
    fraudPrediction: {
      type: String,
      enum: ["Genuine", "Fraud", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Claim = mongoose.models.Claim || mongoose.model("Claim", claimSchema);

export default Claim;

