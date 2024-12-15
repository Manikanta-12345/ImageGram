import express from "express";
import connectToDB from "./config/dbConfig.js";
import apiRouter from "./routes/v1/apiRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./utils/swaggerOptions.js";
const PORT = 3000;

const app = express();

const swaggerDocs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", apiRouter);

const router = express.Router();

//if you want to apply any middle ware for all request like filter in java then attact to app.use()

app.use(express.json()); //earlier we have bodyParser
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("ImageGram Server Started...");
  connectToDB();
});
