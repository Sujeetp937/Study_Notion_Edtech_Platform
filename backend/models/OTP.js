const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {

    const name = email
      .split("@")[0]
      .split(".")
      .map(part => part.replace(/\d+/g, ""))
      .join(" ");

    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      otpTemplate(otp, name)
    );

    console.log("Email sent successfully to - ", email);

  } catch (error) {

    console.log("Error while sending email to ", email);

    throw error;
  }
}

OTPSchema.pre("save", async function (next) {

  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }

  next();
});

module.exports = mongoose.model("OTP", OTPSchema);