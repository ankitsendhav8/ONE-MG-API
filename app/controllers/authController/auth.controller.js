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
        let registerExisting = await AuthService.registerExistingUser(
          userDetails,
          isUserAvailable[0].iCustomerId
        );
        if (registerExisting === 1) {
          result = [isUserAvailable[0].iCustomerId];
        }
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
      if (result && result.length) {
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
      if (result && result.length) {
        const updateOtp = await AuthService.updateOtp(
          {
            vOTPCode: '',
          },
          result[0].iCustomerId
        );

        res.status(200).json({
          success: 1,
          message: 'User details verified successfully',
          data: {
            customer_id: result[0].iCustomerId,
          },
        });
      } else {
        res.status(200).json({
          success: 0,
          message: 'please enter valid otp',
          data: {},
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
      if (result === 1) {
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
      let date = new Date();
      let accessKey =
        Math.floor(Math.random() * 1000000 + 1) +
        'medicos_app' +
        date.getTime();
      let userData = {
        vEmail: userDetails.email,
        eMobileVerified: 'Yes',
        vAccessKey: accessKey,
        dLastAccess: date,
      };
      const result = await AuthService.loginUser(
        userData,
        userDetails.customer_id
      );
      if (result) {
        let getUserDetails = await AuthService.getUserDetails(
          userDetails.customer_id
        );
        let jwtSecretKey = process.env.JWT_SECRET;
        let tokendata = {
          customer_id: getUserDetails[0].iCustomerId,
          email: getUserDetails[0].vEmail,
          phone_number: getUserDetails[0].vPhonenumber,
          is_mobile_verified: getUserDetails[0].eMobileVerified,
          location: getUserDetails[0].vLocation,
          registered_date: getUserDetails[0].dtRegisteredDate,
          status: getUserDetails[0].eStatus,
          joined_by: getUserDetails[0].eSocialMediaType,
          vAccessKey: getUserDetails[0].vAccessKey,
        };

        const token = jwtwebtoken.sign(tokendata, jwtSecretKey);
        let response = tokendata;
        response.access_token = token;
        res.status(200).json({
          success: 1,
          message: 'User logged in successfully',
          data: response,
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
