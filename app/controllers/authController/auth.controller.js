import jwtwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthService from '../../services/auth.service';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'ankitsendhav8@gmail.com',
    pass: 'sendhav888#',
  },
});

class AuthController {
  constructor(authService) {
    this.AuthService = authService;
  }
  signup = async (req, res) => {
    try {
      const data = req.body;
      const password = await bcrypt.hash(data.password, 10);
      let OtpCode = Math.floor(Math.random() * 1000000 + 1);
      let currentDate = new Date();
      let userDetails = {
        vCustomerName: data.name,
        vEmail: data.email,
        vPassword: password,
        vDialCode: '+91',
        vPhonenumber: data.phone_number,
        vOTPCode: OtpCode,
        vLocation: data.address,
        dtRegisteredDate: currentDate,
        eStatus: 'Active',
        eSocialMediaType: 'Application',
        vSocialMediaId: 0,
        eGender: 'Male',
        eEmailVerified: 'No',
        vOTPCode: OtpCode,
      };

      const result = await AuthService.signup(userDetails);
      console.log(result);
      if (result && result.length) {
        res.status(200).json({
          success: 1,
          message: 'User Registered Successfully',
          data: { customer_id: result[0] },
        });
      } else {
        res.status(200).json({
          success: 0,
          message: 'Something went wrong, please try again',
          data: {},
        });
      }
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.code,
      });
      console.log(err);
    }
  };

  getUser = async (req, res) => {
    const userId = req.params.id;

    try {
      const result = await AuthService.getUser(userId);
      res.status(200).json({
        success: 1,
        message: 'User details fetched successfully',
        data: result,
      });
    } catch (err) {
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  };

  login = async (req, res) => {
    res.send('called');
    // const userData = req.body;

    // try {
    //   const result = {};
    //   const encPassword = await AuthService.getpassword(userData.userEmail);
    //   const isPasswordVerified = await bcrypt.compare(
    //     userData.userPassword,
    //     encPassword[0].userPassword
    //   );

    //   if (isPasswordVerified) {
    //     const user = await AuthService.login(userData.userEmail);
    //     const token = jwtwebtoken.sign(
    //       { id: user[0].id, userName: user[0].userName },
    //       process.env.JWT_SECRET,
    //       {
    //         expiresIn: '24h',
    //       }
    //     );
    //     res.status(200).json({
    //       success: 1,
    //       message: 'Login successfully',
    //       data: token,
    //     });
    //   } else {
    //     res.status(500).json({
    //       success: 0,
    //       message: 'Please enter valid credentials',
    //       data: result,
    //     });
    //   }
    // } catch (err) {
    //   // next(err);
    //   res.status(500).json({
    //     success: 0,
    //     message: err.message || 'Something went wrong',
    //   });
    // }
  };
  forgotpassword = async (req, res) => {
    const useremail = req.body.userEmail;

    try {
      const result = await AuthService.forgotPassword(useremail);

      res.status(200).json({
        success: 1,
        message: 'User found successfully',
        data: result,
      });
    } catch (err) {
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  };
  updatepassword = async (req, res, next) => {
    const userData = req.body;
    const password = await bcrypt.hash(userData.userPassword, 10);
    userData.userPassword = password;

    try {
      const result = await AuthService.updatePassword(userData);

      res.status(200).json({
        success: 1,
        message: 'User Password updated successfully',
        data: result,
      });
    } catch (err) {
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong with password update',
      });
    }
  };
}

export default new AuthController(AuthService);
