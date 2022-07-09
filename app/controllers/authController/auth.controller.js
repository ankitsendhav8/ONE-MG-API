import jwtwebtoken from 'jsonwebtoken';
import AuthService from '../../services/auth.service';
import GeneralFunctionService from '../../services/generalfunction';
class AuthController {
  constructor(authService) {
    this.AuthService = authService;
  }
  register = async (req, res) => {
    try {
      const data = req.body;
      let result;
      let finalResult;
      let isUserAvailable = await AuthService.getPhoneNumber(data.phone_number);
      if (isUserAvailable && isUserAvailable.length) {
        let getUserDetails = await AuthService.getUserDetails(
          isUserAvailable[0].iCustomerId
        );
        let jwtSecretKey = process.env.JWT_SECRET;

        let tokendata = {
          customer_id: getUserDetails[0].iCustomerId,
          email: getUserDetails[0].vEmail,
          first_name: getUserDetails[0].vFirstName,
          last_name: getUserDetails[0].vLastName,
          full_name: getUserDetails[0].vFullName,
          phone_number: getUserDetails[0].vPhonenumber,
          is_mobile_verified: getUserDetails[0].eMobileVerified,
          location: getUserDetails[0].vLocation,
          registered_date: await GeneralFunctionService.changeDate(
            getUserDetails[0].dtRegisteredDate
          ),
          status: getUserDetails[0].eStatus,
          joined_by: getUserDetails[0].eSocialMediaType,
          access_key: getUserDetails[0].vAccessKey,
          date_of_birth: await GeneralFunctionService.changeDate(
            getUserDetails[0].dDateOfBirth
          ),
        };
        const token = jwtwebtoken.sign(tokendata, jwtSecretKey);
        if (getUserDetails[0].eUserUpdated === 'Yes') {
          finalResult = tokendata;
          finalResult.access_token = token;
        } else {
          finalResult = {};
          finalResult.customer_id = getUserDetails[0].iCustomerId;
        }
        finalResult.is_already_user = true;
        finalResult.is_detail_Updated =
          getUserDetails[0].eUserUpdated === 'Yes' ? true : false;
        let date = new Date();
        let accessKey =
          Math.floor(Math.random() * 1000000 + 1) +
          'medicos_app' +
          date.getTime();

        let userDetails = {
          vOTPCode: '2222',
          eMobileVerified: 'No',
          vAccessKey: accessKey,
          dLastAccess: date,
        };
        let registerExisting = await AuthService.registerExistingUser(
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
          eUserUpdated: 'No',
        };
        result = await AuthService.register(userDetails);
        finalResult = {
          customer_id: result[0],
          is_already_user: false,
          is_detail_Updated: false,
        };
      }
      if (finalResult) {
        res.status(200).json({
          success: 1,
          message:
            'OTP send to ' +
            data.phone_number +
            ' , Please verify your mobile number',
          data: finalResult,
        });
      } else {
        res.status(200).json({
          success: 0,
          message: 'Something went wrong, please try again',
          data: {},
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: 0,
        message: err.code,
      });
    }
  };

  verifyOtp = async (req, res) => {
    try {
      const userId = req.body.customer_id;
      const otp_code = req.body.otp;

      const result = await AuthService.getUser(userId, otp_code);
      if (result && result.length) {
        const updateOtp = await AuthService.updateOtp(
          {
            vOTPCode: '',
            eMobileVerified: 'Yes',
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
          message: 'please enter valid OTP',
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
          message: 'OTP resend successfully',
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
        message: err.message || 'Something went wrong with otp',
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
        vFirstName: userDetails.first_name,
        vLastName: userDetails.last_name,
        vFullName: userDetails.first_name + ' ' + userDetails.last_name,
        eGender: userDetails.gender,
        iPostCode: userDetails.post_code,
        eMobileVerified: 'Yes',
        eUserUpdated: 'Yes',
        dDateOfBirth: userDetails.date_of_birth,
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
          first_name: getUserDetails[0].vFirstName,
          last_name: getUserDetails[0].vLastName,
          full_name: getUserDetails[0].vFullName,
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
