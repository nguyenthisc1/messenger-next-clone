import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).json({ message: "Access Denied" });

    if (typeof token !== "undefined") {
        const bearer = token.split(" ");
        const bearerToken = bearer[1];
        const verified = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
        next();
    } else {
        return res.status(400).json({ message: "Invalid Token" });

    }
}
