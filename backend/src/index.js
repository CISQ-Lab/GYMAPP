import express from "express";
import {dirname, join}from "path";
import { fileURLToPath } from "url";

import indexRouter from "./routes/routes.js";
import testRoutes from "./routes/test.routes.js"
import usersRoutes from "./routes/users.routes.js"
import authRoutes from "./routes/auth.routes.js"
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json())
app.use("/api", testRoutes);
app.use("/api/users", usersRoutes)
app.use("/api/auth", authRoutes)


app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(indexRouter);
app.listen(port);
app.use(express.static(join(__dirname, "public")));



console.log(`Server is running on port ${port}`);