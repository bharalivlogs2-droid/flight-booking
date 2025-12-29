import mongoose from "mongoose";

const FlightEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true }
});

export default mongoose.models.FlightEnquiry || mongoose.model("FlightEnquiry", FlightEnquirySchema);
