require("dotenv").config();
const axios = require("axios");
const prisma = require("../../../Middlewares/prisma");

const INSERT_INVOICE = async (req, res) => {
  try {
    
  } catch (err) {
    console.log("🚨 Error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      data: [],
      message:
        "Серверийн алдаа гарлаа: " +
        (err.response?.data?.error_description || err.message),
    });
  }
};

module.exports = INSERT_INVOICE;