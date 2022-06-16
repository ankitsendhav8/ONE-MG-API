import jwtwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthService from '../../services/auth.service';
import nodemailer from 'nodemailer';

class AuthController {
  constructor(authService) {
    this.AuthService = authService;
  }
  register = async (req, res) => {
    try {
      const data = req.body;
      let result;
      let isUserAvailable = await AuthService.getPhoneNumber(data.phone_number);

      if (isUserAvailable && isUserAvailable.length) {
        let userDetails = {
          vOTPCode: '2222',
          eMobileVerified: 'No',
        };
        result = await AuthService.registerExistingUser(
          userDetails,
          isUserAvailable[0].iCustomerId
        );
      } else {
        let currentDate = new Date();
        let userDetails = {
          vPhonenumber: data.phone_number,
          dtRegisteredDate: currentDate,
          eStatus: 'Active',
          eSocialMediaType: 'Application',
          vSocialMediaId: 0,
          vOTPCode: '1111',
          eMobileVerified: 'No',
        };

        result = await AuthService.register(userDetails);
      }
      // const password = await bcrypt.hash(data.password, 10);
      // let OtpCode = Math.floor(Math.random() * 1000000 + 1);
      console.log('final result', result);
      if (result) {
        res.status(200).json({
          success: 1,
          message: 'Logged in Successfully',
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

  verifyOtp = async (req, res) => {
    const userId = req.body.customer_id;
    const otp_code = req.body.otp;

    try {
      const result = await AuthService.getUser(userId, otp_code);
      if (result) {
        res.status(200).json({
          success: 1,
          message: 'User details verified successfully',
          data: result,
        });
      } else {
        res.status(200).json({
          success: 0,
          message: 'Something went wrong,please try again',
          data: result,
        });
      }
    } catch (err) {
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  };
  resendOtp = async (req, res, next) => {
    const userId = req.body.customer_id;

    try {
      let userData = {
        eMobileVerified: 'No',
        vOTPCode: '3333',
      };
      const result = await AuthService.updateOtp(userData, userId);
      if (result) {
        res.status(200).json({
          success: 1,
          message: 'Otp resend successfully',
          data: result,
        });
      } else {
        res.status(200).json({
          success: 0,
          message: 'Something went wrong,please try again',
          data: result,
        });
      }
    } catch (err) {
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong with password update',
      });
    }
  };

  login = async (req, res, next) => {
    const userDetails = req.body;

    try {
      let userData = {
        vEmail: userDetails.email,
        eMobileVerified: 'Yes',
      };
      const result = await AuthService.loginUser(
        userData,
        userDetails.customer_id
      );
      if (result) {
        res.status(200).json({
          success: 1,
          message: 'User logged in successfully',
          data: result,
        });
      } else {
        res.status(200).json({
          success: 0,
          message: 'Something went wrong,please try again',
          data: result,
        });
      }
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
