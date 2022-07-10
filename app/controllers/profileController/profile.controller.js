import jwtwebtoken from 'jsonwebtoken';
import ProfileService from '../../services/profile.service';
import GeneralFunctionService from '../../services/generalfunction';
class ProfileController {
  constructor(profileService) {
    this.ProfileService = profileService;
  }

  getDetails = async (req, res, next) => {
    try {
      const userId = req.params.id;

      if (req.headers && req.headers.authorization) {
        let isTokenVerified = await GeneralFunctionService.verifyMyToken(
          req.headers.authorization.split(' ')[1],
          userId
        );
        if (isTokenVerified) {
          let result = await ProfileService.getUserDetails(userId);

          if (result && result.length) {
            let finalResponse = {
              customer_id: result[0].iCustomerId,
              first_name: result[0].vFirstName,
              last_name: result[0].vLastName,
              full_name: result[0].vFullName,
              email: result[0].vEmail,
              phone_number: result[0].vPhonenumber,
              gender: result[0].eGender,
              post_code: result[0].iPostCode,
            };
            finalResponse.date_of_birth =
              await GeneralFunctionService.changeDate(result[0].dDateOfBirth);
            res.status(200).json({
              success: 1,
              message: 'User details found successfully',
              data: finalResponse,
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'No user detail found',
              data: result,
            });
          }
        } else {
          res.status(403).json({
            success: 0,
            message: 'Invalid User ',
          });
        }
      } else {
        res.status(200).json({
          success: 0,
          message: 'Token not found',
        });
      }
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong please try again',
      });
    }
  };

  updateDetails = async (req, res, next) => {
    try {
      const userId = req.params.id;
      let userDetails = req.body;

      if (req.headers && req.headers.authorization) {
        let isTokenVerified = await GeneralFunctionService.verifyMyToken(
          req.headers.authorization.split(' ')[1],
          userId
        );
        if (isTokenVerified) {
          let data_of_update = {
            vFirstName: userDetails.first_name,
            vLastName: userDetails.last_name,
            vFullName: userDetails.first_name + ' ' + userDetails.last_name,
            vEmail: userDetails.email.toLowerCase(),
            vPhonenumber: userDetails.phone_number,
            eGender: userDetails.gender,
            iPostCode: userDetails.post_code,
            dDateOfBirth: userDetails.date_of_birth,
          };

          data_of_update.dModifiedDate =
            await GeneralFunctionService.getCurrentDateTime();

          let updating_user_data = await ProfileService.updateUserDetails(
            data_of_update,
            userId
          );
          let result = await ProfileService.getUserDetails(userId);
          if (result && result.length) {
            let finalResponse = {
              first_name: result[0].vFirstName,
              last_name: result[0].vLastName,
              full_name: result[0].vFullName,
              email: result[0].vEmail,
              phone_number: result[0].vPhonenumber,
              gender: result[0].eGender,
              post_code: result[0].iPostCode,
            };
            finalResponse.date_of_birth =
              await GeneralFunctionService.changeDate(result[0].dDateOfBirth);
            res.status(200).json({
              success: 1,
              message: 'User details updated successfully',
              data: finalResponse,
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'Something went wrong,please try again',
              data: result,
            });
          }
        } else {
          res.status(403).json({
            success: 0,
            message: 'Invalid User ',
          });
        }
      } else {
        res.status(200).json({
          success: 0,
          message: 'Token not found',
        });
      }
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong please try again',
      });
    }
  };
}
export default new ProfileController(ProfileService);
