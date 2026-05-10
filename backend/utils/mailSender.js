const SibApiV3Sdk = require("sib-api-v3-sdk");

const mailSender = async (email, title, body) => {
  try {

    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
      sender: {
        email: "sujeetpal1818@gmail.com",
        name: "StudyNotion",
      },

      to: [
        {
          email: email,
        },
      ],

      subject: title,
      htmlContent: body,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent successfully");

    return data;

  } catch (error) {

    console.log("MAIL ERROR:", error);
    throw error;

  }
};

module.exports = mailSender;