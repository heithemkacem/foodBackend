const express = require("express");
const router = express.Router();
const {
  verifyOTPEmail,
  resendOTP,
  verifyOTPModifyPassword,
} = require("./../controllers/otp");
//! Still Not Tested need testes
//Verify OTP For Modify Password
router.post("/verify-modify-password", async (req, res) => {
  const { otp, id } = req.body;
  //transform id to string
  try {
    await verifyOTPModifyPassword(id, otp);
    res.json({
      success: true,
      message: "You can set your new password now",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// Check the type of user ID
router.post("/resendOTP", async (req, res) => {
  try {
    let { id, email } = req.body;

    const resendEmail = await resendOTP(id, email);
    if (resendEmail === true) {
      res.json({
        success: true,
        message: "OTP has been resent",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
