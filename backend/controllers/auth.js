// sendOtp , signup , login , changePassword

const User = require('./../models/user');
const Profile = require('./../models/profile');
const otpGenerator = require('otp-generator');
const OTP = require('../models/OTP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");


// ================ SEND OTP ================
exports.sendOTP = async (req, res) => {
    try {

        // fetch email
        const { email } = req.body;

        // validation
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // check user already exists
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            });
        }

        // generate otp
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("Generated OTP:", otp);

        // save otp in DB
        // email will be sent automatically from OTP model pre-save hook
        await OTP.create({
            email,
            otp,
        });

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {

        console.log("Error while sending OTP:", error);

        return res.status(500).json({
            success: false,
            message: "Error while sending OTP",
        });
    }
};



// ================ SIGNUP ================
exports.signup = async (req, res) => {
    try {

        // fetch data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        console.log("REQ BODY:", req.body);

        // validation
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !accountType ||
            !otp
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // password match check
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match",
            });
        }

        // user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered. Please login.",
            });
        }

        // find latest OTP
        const recentOtp = await OTP.findOne({ email })
            .sort({ createdAt: -1 });

        console.log("Recent OTP:", recentOtp);
        console.log("User OTP:", otp);

        // otp not found
        if (!recentOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired",
            });
        }

        // otp validation
        if (
            otp.toString().trim() !==
            recentOtp.otp.toString().trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create profile
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        // approval logic
        const approved =
            accountType === "Instructor" ? false : true;

        // create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            accountType,
            approved,
            additionalDetails: profileDetails._id,

            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
        });

        console.log("User Created:", user);

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {

        console.log("Signup Error:", error);

        return res.status(500).json({
            success: false,
            message: "User cannot be registered",
            error: error.message,
        });
    }
};



// ================ LOGIN ================
exports.login = async (req, res) => {
    try {

        // fetch data
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check user exists
        let user = await User.findOne({ email })
            .populate("additionalDetails");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            });
        }

        // compare password
        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        // payload
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        };

        // generate token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        // convert user to object
        user = user.toObject();

        user.token = token;
        user.password = undefined;

        // cookie options
        const options = {
            expires: new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };

        // send response
        return res
            .cookie("token", token, options)
            .status(200)
            .json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });

    } catch (error) {

        console.log("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Login failure",
            error: error.message,
        });
    }
};



// ================ CHANGE PASSWORD ================
exports.changePassword = async (req, res) => {
    try {

        // fetch data
        const {
            oldPassword,
            newPassword,
            confirmNewPassword
        } = req.body;

        // validation
        if (
            !oldPassword ||
            !newPassword ||
            !confirmNewPassword
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // get user
        const userDetails = await User.findById(req.user.id);

        // check old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // match new passwords
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "New Password and Confirm Password do not match",
            });
        }

        // hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // update password
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword },
            { new: true }
        );

        // send email
        try {

            await mailSender(
                updatedUser.email,
                "Password Updated Successfully",
                passwordUpdated(
                    updatedUser.email,
                    `Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}`
                )
            );

        } catch (error) {

            console.log("Email Error:", error);

            return res.status(500).json({
                success: false,
                message: "Error while sending email",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {

        console.log("Change Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Error while changing password",
            error: error.message,
        });
    }
};