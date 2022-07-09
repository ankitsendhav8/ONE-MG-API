import MedicineService from '../../services/medicine.service';
import GeneralFunctionService from '../../services/generalfunction';

class MedicineController {
  constructor(medicineService) {
    this.MedicineService = medicineService;
  }

  getMedicineList = async (req, res, next) => {
    try {
      let final_response = [];
      if (req.headers && req.headers.authorization) {
        let isTokenVerified = await GeneralFunctionService.verifyToken(
          req.headers.authorization.split(' ')[1]
        );
        if (isTokenVerified) {
          let requestedData = req.body;
          let totalMedicine = await MedicineService.getMedicineCounts(
            requestedData.category_id
          );
          let result = await MedicineService.getMedicineList(requestedData);

          if (result && result.length) {
            result.forEach((element) => {
              let obj = {
                medicine_id: element.iMedicineId,
                medicine_name: element.vMedicineName,
                category_id: element.iCategoryId,
                medicine_image: process.env.IMAGE_PATH + element.vMedicineImage,
                status: element.eStatus,
                added_date: element.dAddedDate,
                rating: element.vRatings,
                no_of_ratings: element.vNoOfRatings,
                price: element.vPrice,
                discount: element.vDiscount,
                quantity: element.vQuantity,
                review: element.vReview,
              };
              final_response.push(obj);
            });
          }
          if (final_response && final_response.length) {
            res.status(200).json({
              success: 1,
              message: 'Medicine list found successfully',
              count: totalMedicine[0]['count(*)'],
              page_size: requestedData.limit,
              page_number: requestedData.page_number,
              data: final_response,
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'No medicine found.',
              data: [],
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
        message: err.message || 'Something went wrong with otp',
      });
    }
  };
  getMedicineDetail = async (req, res, next) => {
    try {
      let final_response;
      let category_id = req.params.category_id;
      let result = await MedicineService.getMedicineDetail(category_id);
      if (result && result.length) {
        final_response = {
          medicine_id: result[0].iMedicineId,
          medicine_name: result[0].vMedicineName,
          category_id: result[0].iCategoryId,
          medicine_image: process.env.IMAGE_PATH + result[0].vMedicineImage,
          status: result[0].eStatus,
          added_date: result[0].dAddedDate,
          rating: result[0].vRatings,
          no_of_ratings: result[0].vNoOfRatings,
          price: result[0].vPrice,
          discount: result[0].vDiscount,
          quantity: result[0].vQuantity,
          review: result[0].vReview,
        };
      }

      if (final_response) {
        res.status(200).json({
          success: 1,
          message: 'Medicine list found successfully',
          data: final_response,
        });
      } else {
        res.status(200).json({
          success: 0,
          message: 'No medicine found.',
          data: [],
        });
      }
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong with otp',
      });
    }
  };
  getDetails = async () => {
    return 'hgjhjknkl';
  };
}
export default new MedicineController(MedicineService);
