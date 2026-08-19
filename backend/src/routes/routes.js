import { Router } from "express";
const router = Router();

router.get("/", (req, res) => res.render("index", { title: "My Express App" }));

router.get("/api/test", (req, res) => {
    res.json({
        mensaje: "Hola desde GYMAPP"
    });
});

export default router;
