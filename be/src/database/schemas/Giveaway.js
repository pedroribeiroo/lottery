import mongoose from "mongoose";

const GiveawaySchema = new mongoose.Schema(
  {
    giveawayId: Number,
    activeTickets: Number,
    finished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("giveaway", GiveawaySchema);
