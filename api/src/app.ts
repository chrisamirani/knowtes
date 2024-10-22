import express, { urlencoded, json } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { errorHandler, notFoundHandler } from "./errors";
import cors from "cors";

export const app = express();

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
app.use(cors());
RegisterRoutes(app);
app.use(notFoundHandler);
app.use(errorHandler);
