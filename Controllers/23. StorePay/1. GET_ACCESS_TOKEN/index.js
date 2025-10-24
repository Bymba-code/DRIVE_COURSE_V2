require("dotenv").config();
const axios = require("axios");
const prisma = require("../../../Middlewares/prisma");

const GET_ACCESS_TOKEN_STOREPAY = async (req, res) => {
  try {
    const systemUsername = process.env.SYSTEM_USERNAME;
    const systemPassword = process.env.SYSTEM_PASSWORD;
    const appUsername = process.env.APP_USERNAME;
    const appPassword = process.env.APP_PASSWORD;

    const basicAuth = Buffer.from(`${appUsername}:${appPassword}`).toString("base64");
    const url = "https://service.storepay.mn/merchant-uaa/oauth/token";

    const response = await axios.post(
      `${url}?grant_type=password&username=${systemUsername}&password=${systemPassword}`,
      {},
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Өгөгдлийн санд token байгаа эсэхийг шалгах
    const existingToken = await prisma.storepay.findFirst({});

    let result;
    if (existingToken) {
      // Token байвал шинэчлэх
      result = await prisma.storepay.update({
        where: { id: existingToken.id },
        data: {
          access_token: response?.data?.access_token,
          refresh_token: response?.data?.refresh_token,
          expires_in: response?.data?.expires_in,
        }
      });
    } else {
      // Token байхгүй бол шинээр үүсгэх
      result = await prisma.storepay.create({
        data: {
          access_token: response?.data?.access_token,
          refresh_token: response?.data?.refresh_token,
          expires_in: response?.data?.expires_in
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
      message: existingToken 
        ? "Access token амжилттай шинэчлэгдлээ." 
        : "Access token амжилттай үүсгэгдлээ.",
    });
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

module.exports = GET_ACCESS_TOKEN_STOREPAY;