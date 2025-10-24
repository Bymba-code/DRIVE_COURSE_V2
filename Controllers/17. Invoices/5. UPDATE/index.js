const prisma = require("../../../Middlewares/prisma");

const UPDATE_INVOICE = async (req, res) => {
    try {
        

    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа. " + err
        });
    }
};

module.exports = UPDATE_INVOICE;
