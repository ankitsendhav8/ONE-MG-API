import MedicineService from '../../services/medicine.service';

class MedicineController {
  constructor(medicineService) {
    this.MedicineService = medicineService;
  }

  getMedicine = async (req, res, next) => {
    try {
      
      // if (result === 1) {
      //   res.status(200).json({
      //     success: 1,
      //     message: 'OTP resend successfully',
      //     data: result,
      //   });
      // } else {
      //   res.status(200).json({
      //     success: 0,
      //     message: 'Something went wrong,please try again',
      //     data: result,
      //   });
      // }
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong with otp',
      });
    }
  };
}
export default new MedicineController(MedicineService);
