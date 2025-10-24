const prisma = require("../Middlewares/prisma")
const axios = require("axios")
async function getStorepayAccessToken() {
  const creds = await prisma.storepay.findFirst({});
  
  if(creds)
  {
    return creds.access_token
  }

  

  if (!creds) 
  {
    const { system_username, system_password, app_username, app_password } = creds;

  const basicAuth = Buffer.from(`${app_username}:${app_password}`).toString("base64");

  const url = "https://service.storepay.mn/merchant-uaa/oauth/token";
  const fullUrl = `${url}?grant_type=password&username=${encodeURIComponent(system_username)}&password=${encodeURIComponent(system_password)}`;

  const response = await axios.post(fullUrl, {}, {
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.access_token;
  }
  
}

module.exports = getStorepayAccessToken;