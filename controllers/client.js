const Client = require("../models/client");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  const userExists = await Client.findOne({ email });

  if (userExists) {
    return res.status(400).json({ success: false, message: "Email is taken!" });
  }
  try {
    const user = await Client.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);

  // res.status(200).json({ success: true, message: 'Login successful!' });
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required!" });
    }

    // Check for existing user
    const user = await Client.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // verify user password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    generateToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();

  res.status(statusCode).cookie("token", token).json({ success: true, token });
};

//LOG OUT USER
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

//Update Password
exports.updatePassword = async (req, res, next) => {
  try {
    const { email, password, newpassword } = req.body;
    if (!email || !password || !newpassword) {
      return res.status(400).json({
        success: false,
        message: "email, password and new password are required!",
      });
    }

    // Check for existing user
    const user = await Client.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // verify user password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    const cryptedpassword = await bcrypt.hash(newpassword, 10);
    const userUpdate = await Client.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: cryptedpassword,
        },
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//send mail Reset Password
exports.sendMail = async (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  // Check for existing user
  const user_email = await Client.findOne({ email: email });

  if (!user_email) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "aymenmissaoui56@gmail.com",
        pass: "gsrizdmqcyvvncfk",
      },
    });
    transporter.verify().then(console.log).catch(console.error);
    const info = await transporter.sendMail({
      from: "Aymen Missaoui <aymenmissaoui56@gmail.com>",
      to: email,
      subject: "Reset Password",
      html: `
        <div>
            <h1>Reset Password</h1>
            <p>Click this <a href="https://expo.dev/accounts/ukps/projects/FoodManagment/ResetPassword?email=${email}">link</a> to reset password</p>
        </div>

        `,
    });

    console.log("Message sent: " + info.messageId);

    res
      .status(200)
      .json({ success: true, message: "check your email to reset password" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//Reset Password

exports.resetPassword = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res
        .status(400)
        .json({ success: false, message: "email and password is required!" });
    }

    const cryptedpassword = await bcrypt.hash(password, 10);
    const userUpdate = await Client.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: cryptedpassword,
        },
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
