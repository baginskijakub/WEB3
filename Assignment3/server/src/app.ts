import express from "express";
import cors from "cors";
import router from "./controllers";


const app: express.Application = express();

const options = {
  origin: '*',
  credentials: true,
};

app.use(cors(options));
app.use(express.json());
app.use(router)

export { app };