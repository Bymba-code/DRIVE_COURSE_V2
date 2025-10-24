const LOGOUT = async (req, res) => {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict",
            path: "/" 
        });

        return res.status(200).json({
            success: true,
            data: [],
            message: "Амжилттай гарлаа."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа. " + err
        });
    }
};

module.exports = LOGOUT;