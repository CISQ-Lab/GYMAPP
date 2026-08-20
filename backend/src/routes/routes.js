import { Router } from "express";
const router = Router();
const user = {
    email: "cisq@cisqlab.com",
    password: "Ciber123"    
}

router.get("/", (req, res) => res.render("index", { title: "My Express App" }));

router.get("/api/test", (req, res) => {
    res.json({
        mensaje: "Hola desde GYMAPP"
    });
});

router.post("/api/login", (req, res) => {

    const {email, password} = req.body;

    email === user.email && password === user.password ?
    res.json({
        success: true,
        message: "Inicio de sesion correcto"
    }) :
    res.status(401).json({
        success: false,
        message: "Inicio de sesion fallido"
    })


    console.log(req.body);
})

export default router;
