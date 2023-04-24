import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    giveaway: { type: mongoose.Schema.Types.ObjectId, ref: "giveaway" },
    users: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        data: { type: Date, default: Date.now },
      },
    ],
    ticketId: Number,
    numbers: { type: [Number], required: true },
    value: Number,
  },
  { timestamps: true }
);
export default mongoose.model("ticket", TicketSchema);
