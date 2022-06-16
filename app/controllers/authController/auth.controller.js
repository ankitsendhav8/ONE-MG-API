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
    pass: 'Sendhavsaab5#',
  },
});

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

  // getUser = async (req, res) => {
  //   const userId = req.params.id;

  //   try {
  //     const result = await AuthService.getUser(userId);
  //     res.status(200).json({
  //       success: 1,
  //       message: 'User details fetched successfully',
  //       data: result,
  //     });
  //   } catch (err) {
  //     // next(err);
  //     res.status(500).json({
  //       success: 0,
  //       message: err.message,
  //     });
  //   }
  // };

  // login = async (req, res) => {
  //   try {
  //     let date = new Date();
  //     const randomString = Math.random().toString(36).substring(2, 9);
  //     let accessKey = randomString + 'medicos' + date.getTime();
  //     const userDatails = req.body;

  //     if (userDatails.login_by === 'email') {
  //       let isEmailAvailable = await AuthService.getEmail(userDatails.email);
  //       if (isEmailAvailable && isEmailAvailable.length) {
  //         const encPassword = await AuthService.getPasswordByEmail(
  //           userDatails.email
  //         );
  //         const isPasswordVerified = await bcrypt.compare(
  //           userDatails.password,
  //           encPassword[0].vPassword
  //         );
  //         if (isPasswordVerified) {
  //           let updateKey = await AuthService.updateAccessKey(
  //             encPassword[0].iCustomerId,
  //             accessKey
  //           );
  //           const user = await AuthService.loginWithEmail(userDatails.email);
  //           const token = jwtwebtoken.sign(
  //             {
  //               customer_id: user[0].iCustomerId,
  //               customer_name: user[0].vCustomerName,
  //               email: user[0].vEmail,
  //               dial_code: user[0].vDialCode,
  //               phone_number: user[0].vPhonenumber,
  //               is_email_verified: user[0].eEmailVerified,
  //               status: user[0].eStatus,
  //               joined_by: user[0].eSocialMediaType,
  //               access_key: user[0].vAccessKey,
  //             },
  //             process.env.JWT_SECRET,
  //             {
  //               expiresIn: '24h',
  //             }
  //           );
  //           res.status(200).json({
  //             success: 1,
  //             message: 'Login successfully',
  //             data: token,
  //           });
  //         } else {
  //           res.status(200).json({
  //             success: 0,
  //             message: 'Please enter valid credentials',
  //             data: {},
  //           });
  //         }
  //       } else {
  //         res.status(200).json({
  //           success: 0,
  //           message: 'Please enter valid credentials',
  //           data: {},
  //         });
  //       }
  //     } else {
  //       let isPhoneAvailable = await AuthService.getPhoneNumber(
  //         userDatails.phone_number
  //       );
  //       if (isPhoneAvailable && isPhoneAvailable.length) {
  //         const encPassword = await AuthService.getPasswordByPhone(
  //           userDatails.phone_number
  //         );
  //         const isPasswordVerified = await bcrypt.compare(
  //           userDatails.password,
  //           encPassword[0].vPassword
  //         );

  //         if (isPasswordVerified) {
  //           let updateKey = await AuthService.updateAccessKey(
  //             encPassword[0].iCustomerId,
  //             accessKey
  //           );
  //           const user = await AuthService.loginWithPhone(
  //             userDatails.phone_number
  //           );
  //           const token = jwtwebtoken.sign(
  //             {
  //               customer_id: user[0].iCustomerId,
  //               customer_name: user[0].vCustomerName,
  //               email: user[0].vEmail,
  //               dial_code: user[0].vDialCode,
  //               phone_number: user[0].vPhonenumber,
  //               is_email_verified: user[0].eEmailVerified,
  //               status: user[0].eStatus,
  //               joined_by: user[0].eSocialMediaType,
  //               access_key: user[0].vAccessKey,
  //             },
  //             process.env.JWT_SECRET,
  //             {
  //               expiresIn: '24h',
  //             }
  //           );
  //           res.status(200).json({
  //             success: 1,
  //             message: 'Login successfully',
  //             data: token,
  //           });
  //         } else {
  //           res.status(200).json({
  //             success: 0,
  //             message: 'Please enter valid credentials',
  //             data: {},
  //           });
  //         }
  //       } else {
  //         res.status(200).json({
  //           success: 0,
  //           message: 'Please enter valid credentials',
  //           data: {},
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     res.status(500).json({
  //       success: 0,
  //       message: err.message || 'Something went wrong',
  //     });
  //   }
  // };
  // forgotpassword = async (req, res) => {
  //   const useremail = req.body.userEmail;

  //   try {
  //     const result = await AuthService.forgotPassword(useremail);

  //     res.status(200).json({
  //       success: 1,
  //       message: 'User found successfully',
  //       data: result,
  //     });
  //   } catch (err) {
  //     // next(err);
  //     res.status(500).json({
  //       success: 0,
  //       message: err.message,
  //     });
  //   }
  // };
  // updatepassword = async (req, res, next) => {
  //   const userData = req.body;
  //   const password = await bcrypt.hash(userData.userPassword, 10);
  //   userData.userPassword = password;

  //   try {
  //     const result = await AuthService.updatePassword(userData);

  //     res.status(200).json({
  //       success: 1,
  //       message: 'User Password updated successfully',
  //       data: result,
  //     });
  //   } catch (err) {
  //     // next(err);
  //     res.status(500).json({
  //       success: 0,
  //       message: err.message || 'Something went wrong with password update',
  //     });
  //   }
  // };
}

export default new AuthController(AuthService);
