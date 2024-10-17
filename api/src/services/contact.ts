import { SubscriptionDB } from "../db/contact";

export const createSubscription = async (email: string) => {
  try {
    const subscription = new SubscriptionDB({ email });
    await subscription.save();
    return true;
  } catch (e: unknown) {
    console.log("Could not save subscription", e);
    return false;
  }
};
