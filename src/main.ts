import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import { routes } from "./routes";

dotenv.config();
export const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
