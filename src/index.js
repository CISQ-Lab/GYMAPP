import express from "express";
import {dirname, join}from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.listen(port);

app.get("/", (req, res) => {
  res.render("index", { title: "My Express App" });
}); 


console.log(`Server is running on port ${port}`);