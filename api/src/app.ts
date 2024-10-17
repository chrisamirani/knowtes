import express, { urlencoded, json } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { generate as generateAPIClient } from "openapi-typescript-codegen";
import { errorHandler, notFoundHandler } from "./errors";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const WEB_BUILD_PATH = path.resolve("..", "web", "build");
const SDK_CONFIG = {
  input: "./build/swagger.json",
  output: "../web/src/api-sdk",
};

export const app = express();

app.use("/app", express.static(WEB_BUILD_PATH));
app.use("/docs", swaggerUi.serve, async (_req: any, res: any) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);
app.use(notFoundHandler);
app.use(errorHandler);
generateAPIClient(SDK_CONFIG);
// mongoose.connect(process.env.MONGO_URI ?? "").then(() => {
//   console.log("connected");
// });
