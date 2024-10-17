import mongoose from "mongoose";

const subscriptionsSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
  },
  { timestamps: true }
);

export const SubscriptionDB = mongoose.model(
  "Subscription",
  subscriptionsSchema
);
