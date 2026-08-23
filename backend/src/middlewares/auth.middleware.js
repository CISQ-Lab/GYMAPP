import JWT from "jsonwebtoken";
import "dotenv/config";

export function verifyToken(req, res, next) {
    const headerAuth = req.headers.authorization;
    if (!headerAuth) {
        return res.status(401).json({
            message: "No cuentas con un token"
        })
    }

    const token = headerAuth.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "No cuentas con un token"
        })
    }

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next();
    } catch (error) {
        return next(error);
    }

}