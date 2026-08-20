import express from "express";
import {dirname, join}from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/routes.js";
import cors from "cors";
import connection from "./database/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json())
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(indexRouter);
app.listen(port);
app.use(express.static(join(__dirname, "public")));



console.log(`Server is running on port ${port}`);