import mongoose from "mongoose";
import { app } from "./app";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  mongoose.connect(process.env.MONGO_URI ?? "").then(() => {
    console.log("DB Connected");
  });
});
