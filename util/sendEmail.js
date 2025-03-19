const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

// OAuth2 Configuration
const CLIENT_ID = process.env.CLIENTID;
const CLIENT_SECRET = process.env.CLIENTSECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    console.log("Refresh Token:", oAuth2Client.credentials.refresh_token);
    const accessToken = await oAuth2Client.getAccessToken();
    console.log("Access Token:", accessToken.token);

    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_ADDRESS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `david <${process.env.EMAIL_ADDRESS}>`,
      to: "elenakolisnyk6@gmail.com",
      subject: "Test Email",
      text: "Hello, this is a test email using OAuth2!",
      html: "<h1>Hello, this is a test email using OAuth2!</h1>",
    };

    // Send Email
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendMail();
