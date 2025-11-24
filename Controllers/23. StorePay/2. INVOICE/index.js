require("dotenv").config();
const axios = require("axios");
const prisma = require("../../../Middlewares/prisma");

const STOREPAY_INVOICE = async (req, res) => {
  try 
  {
    const { amount, phone } = req.body;

    if(!amount)
    {
      return res.status(403).json({
        success:false,
        data:[],
        message: "Үнийн дүн оруулна уу."
      })
    }

    if(!phone)
    {
      return res.status(400).json({
        success:false,
        data:[],
        message: "Утасны дугаар оруулна уу."
      })
    }
  } 
  catch(err) 
  {
   
  }
};

module.exports = INSERT_INVOICE;