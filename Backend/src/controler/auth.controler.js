import bycryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenandSetCookies } from "../Utils/generateTokenandsetCookies.js";
import { User } from "../model/auth.model.js";
import {
  sendresetPasswordMail,
  sendEmailVerification,
  sendWelcomEmail,
  sendPasswordResetSuccessfully,
} from "../MailTrap/emails.js";

export const signup = async (req, res) => {
  console.log(req.body);
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All Fields are required");
    }
    const userAlreadyExit = await User.findOne({ email });
    if (userAlreadyExit) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }

    const haspassword = await bycryptjs.hash(password, 6);
   const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();


    const newUser = new User({
      email,
      password: haspassword,
      name,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, //24hours
    });

    await newUser.save();

    //generat a cookie that verify user authentication
    generateTokenandSetCookies(res, newUser._id);

    await sendEmailVerification(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "user Created succussfully",
      newUser: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
      console.log("inside verify emai", code);
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpireAt: { $gt: Date.now() },
    });
    console.log("user in verify email in backend", user);

    if (!user) {
      res.json({
        success: false,
        message: "invalid Token or Token has been expired"
      });
    }
    user.isverified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;

    await user.save();
    console.log("inside verify emai", code);
    await sendWelcomEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "welcome email send successfully",
      user: { ...user._doc, password: undefined },
    });
 } catch (error) {
  console.log("internal server error in verify email", error);
  res.status(500).json({
    success: false,
    message: "internal server error",
    error: error.message,
  });
}

};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email and password in login",{email})
    const user = await User.findOne({ email });
    console.log('user in login',user)
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "user not found,invalid Email" });
    }

    const isPassword =  bycryptjs.compare(password, user.password);
    if (!isPassword) {
      res.status(400).json({ success: false, message: "invalid Password" });
    }

    console.log("user in login", user);
    generateTokenandSetCookies(res, user._id);
    console.log("user after generate token", user);
    user.lastlogin = Date();
    user.save();
    res.status(200).json({ success: true, message: "login successfully" });
  } catch (error) {
    console.log("error in login", error);
    res.status(500).json("internal server error", error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "user logout successfully",
  });
};

export const forgetPassword = async (req, res) => {

  const { email } = req.body;
  console.log('email in forgetpassword controlers', {email});
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found,invalid credential" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const tokenexpire = Date.now() + 1 * 60 * 60 * 1000; //1hour,
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpireAt = tokenexpire;
    console.log("reset token and expire at", { resetToken });
    await user.save();
    await sendresetPasswordMail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email send successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("error in forget password ", error);
    res.status(500).json("internal server error", error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log("token and password in reset password in controler of reset password", { token, password });
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpireAt: { $gt: Date.now() },
    });
    console.log("user in reset password", user);
    if (!user) {
     return res.status(400).json({
        success: false,
        message: "invalid token or  token has been expired",
      });
    }

    const hashPassword = bycryptjs.hash(password,6);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
    await sendPasswordResetSuccessfully(user.email);
  } catch (error) {
    console.log("error in reset password", error);
    res.status(500).json("internal server error", error);
  }
};

export const checkAuth = async (req, res) => {
  console.log("inside auth check", req.userId);
  try {
    console.log("inside try block of checkAAuth controller");
    const user = await User.findById(req.userId).select("-password");
    console.log("user in await of authcheck controler",user)
    if (!user) {
      res
      .status(400)
      .json({ success: false, message: "user not found,invalid Email" });
    }
    console.log(user.email, "user in auth check")

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error in authcheck in checkout function", error);
    res.status(500).json("internal server error", error)
  }
};

