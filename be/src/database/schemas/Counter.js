import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: Number,
});

export default mongoose.model("counter", CounterSchema);
