import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
    profit: {
      type: Number,
      default: 0,
    },
    tickets: [
      {
        ticket: { type: mongoose.Schema.Types.ObjectId, ref: "ticket" },
        data: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("user", UserSchema);
