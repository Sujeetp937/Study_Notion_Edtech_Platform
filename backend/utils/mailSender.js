const brevo = require("@getbrevo/brevo");

const mailSender = async (email, title, body) => {
  try {

    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = title;
    sendSmtpEmail.htmlContent = body;

    sendSmtpEmail.sender = {
      name: "StudyNotion",
      email: "sujeetpal1818@gmail.com",
    };

    sendSmtpEmail.to = [
      {
        email: email,
      },
    ];

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent successfully");

    return response;

  } catch (error) {

    console.log("MAIL ERROR:", error);
    throw error;

  }
};

module.exports = mailSender;