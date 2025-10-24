const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
        return res.status(401).json({
            success: false,
            message: "Буруу хүсэлт дахин оролдоно уу.",
        });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Токен байхгүй байна.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "Токен дууссан эсвэл буруу байна."
        });
    }
};

module.exports = Authenticate;
