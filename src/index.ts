import express, { Application } from "express";
import rootRouter from "./rootRouter";
import { PORT, ENV } from "./secret";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec, swaggerUiOptions } from "./middleware/swagger";

const app: Application = express();

app.use(express.json());

app.use("/healthcheck", (req, res) => {
  res.status(200).send("ok");
});

app.use("/api", rootRouter);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions),
);

app.listen(PORT, () => {
  // logger.info(`DinkLink Server is running on port ${PORT} in ${ENV} mode`);
});

export default app;
