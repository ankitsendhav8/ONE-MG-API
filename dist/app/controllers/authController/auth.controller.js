'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'));

var _bcrypt = _interopRequireDefault(require('bcrypt'));

var _auth = _interopRequireDefault(require('../../services/auth.service'));

var _nodemailer = _interopRequireDefault(require('nodemailer'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class AuthController {
  constructor(authService) {
    _defineProperty(this, 'register', async (req, res) => {
      try {
        const data = req.body;
        let result;
        let isUserAvailable = await _auth.default.getPhoneNumber(
          data.phone_number
        );

        if (isUserAvailable && isUserAvailable.length) {
          let userDetails = {
            vOTPCode: '2222',
            eMobileVerified: 'No',
          };
          let registerExisting = await _auth.default.registerExistingUser(
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
          result = await _auth.default.register(userDetails);
        } // const password = await bcrypt.hash(data.password, 10);
        // let OtpCode = Math.floor(Math.random() * 1000000 + 1);

        if (result && result.length) {
          res.status(200).json({
            success: 1,
            message: 'Logged in Successfully',
            data: {
              customer_id: result[0],
            },
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
      }
    });

    _defineProperty(this, 'verifyOtp', async (req, res) => {
      const userId = req.body.customer_id;
      const otp_code = req.body.otp;

      try {
        const result = await _auth.default.getUser(userId, otp_code);

        if (result && result.length) {
          const updateOtp = await _auth.default.updateOtp(
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
    });

    _defineProperty(this, 'resendOtp', async (req, res, next) => {
      const userId = req.body.customer_id;

      try {
        let userData = {
          eMobileVerified: 'No',
          vOTPCode: '3333',
        };
        const result = await _auth.default.updateOtp(userData, userId);

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
    });

    _defineProperty(this, 'login', async (req, res, next) => {
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
        const result = await _auth.default.loginUser(
          userData,
          userDetails.customer_id
        );

        if (result) {
          let getUserDetails = await _auth.default.getUserDetails(
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

          const token = _jsonwebtoken.default.sign(tokendata, jwtSecretKey);

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
    });

    this.AuthService = authService;
  }
}

var _default = new AuthController(_auth.default);

exports.default = _default;
