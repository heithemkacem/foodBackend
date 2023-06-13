const OTPVerification = require("../models/otp");
const hashData = require("../util/hashData");
const verifyHashedData = require("../util/verifyHashedData");
const sendEmail = require("../util/sendEmail");
const otpGenerator = require("otp-generator");
//! Still Not Tested need testes
const sendOTPVerificationEmail = async ({ _id, email }) => {
  try {
    const id = _id;
    //url to be used in the email
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "TBGE Mobile",
      html: `
      Bonjour 
      Voici votre code : 
      <h1>${otp}</h1>
      \n\nMerci!\n`,
    };
    //hash the unique string
    const hashedOTP = await hashData(otp);
    //set values in userVerification collection
    const UserVerification = new OTPVerification({
      userID: id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });
    await UserVerification.save();
    await sendEmail(mailOptions);
    return {
      UserID: id,
      email: email,
    };
  } catch (error) {
    throw error;
  }
};

const verifyOTPModifyPassword = async (userID, otp) => {
  try {
    if (!otp || !userID) {
      throw Error("common:Empty_details_are_not_allowed");
      //Empty details are not allowed
    } else {
      //transfor userId to a integer
      const existingRecord = await OTPVerification.findOne({ userID: userID });
      if (existingRecord != null) {
        //todo User Verification Record Exist So We Procced
        const expiresAt = existingRecord.expiresAt;
        const hashedOTP = existingRecord.otp;
        //get the current time
        var currentTime = new Date();

        if (expiresAt < currentTime) {
          //!Record has expired
          await OTPVerification.deleteMany({ userID: userID });
          let message = "common:OTP_has_expired";
          //OTP has expired,Please signup again
          throw new Error(message);
        } else {
          //!Valid record exist
          //?Comparing the unique string
          const matchString = await verifyHashedData(otp, hashedOTP);
          //todo Strings match
          if (matchString) {
            await OTPVerification.deleteMany({ userID: userID });
            //transform id to integer
          } else {
            throw Error("common:Invalid_verification_details_passed");
          }
        }
      } else {
        throw Error("common:No_record_exist_push_resend_email");
      }
    }
  } catch (error) {
    throw error;
  }
};

const resendOTP = async (userID, email) => {
  try {
    if (!userID || !email) {
      throw Error("common:Empty_details_are_not_allowed");
    } else {
      // delete existing records and resend
      await OTPVerification.deleteMany({ userID: userID });
      const _id = userID;
      await sendOTPVerificationEmail({ _id, email });

      return true;
    }
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  sendOTPVerificationEmail,
  resendOTP,
  verifyOTPModifyPassword,
};
