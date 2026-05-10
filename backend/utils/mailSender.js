const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "StudyNotion || by Sujeet Pal",
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.response);

    return info;
  } catch (error) {
    console.log("MAIL SENDER ERROR:", error);
    throw error;
  }
};

module.exports = mailSender;