import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailtemplete.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendEmailVerification = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("email send successfully");
  } catch (error) {
    console.log(`error in sending email`, error);
    throw new Error(`error in sending email ${error}`);
  }
};

export const sendWelcomEmail = async (email, userName) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "930e21b7-9c2c-4493-a357-00e735b78388",
      template_variables: {
        name: userName,
        company_info_name: "Auth-Company",
      },
    });
    console.log("welcom email send successfully");
  } catch (error) {
    console.log("error in welcome email", error);
    throw new Error("error in sending welcome email", error);
  }
}

export const sendresetPasswordMail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    console.log("mail in mailtrap",{email,resetUrl})
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "reset Password",
    });
    console.log("reset Password email send successfully");
  } catch (error) {
    console.log("error in reset Password email", error);
    throw new Error("error in sending reset Password email", error);
  }
};


export const sendPasswordResetSuccessfully=async(email)=>{
  const recipient=[{email}]
  try {
    const response=await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"Password Reset Successfully",
      html:PASSWORD_RESET_SUCCESS_TEMPLATE,
      category:"successfully Password Reset"
    
    })
    
  } catch (error) {
        console.log("error in successfully reset Password email", error);
    throw new Error("error in sending reset Password  successfully email", error);
  }
}