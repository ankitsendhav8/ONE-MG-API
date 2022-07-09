import { result } from 'lodash';

import CategoryService from '../../services/category.service';
import GeneralFunctionService from '../../services/generalfunction';
class CategoryController {
  constructor(categoryService) {
    this.CategoryService = categoryService;
  }

  getCategory = async (req, res, next) => {
    try {
      let final_response = [];
      if (req.headers && req.headers.authorization) {
        let isTokenVerified = await GeneralFunctionService.verifyToken(
          req.headers.authorization.split(' ')[1]
        );
        if (isTokenVerified) {
          let requestedData = req.body;
          let totalCategories = await CategoryService.getCategoryCounts();
          let result = await CategoryService.getCategoryList(requestedData);

          if (result && result.length) {
            result.forEach((element) => {
              let obj = {
                category_id: element.iCategoryId,
                category_name: element.vCategoryName,
                category_image: process.env.IMAGE_PATH + element.vCategoryImage,
                status: element.eStatus,
                // added_date: element.dAddedDate,
              };
              final_response.push(obj);
            });
            res.status(200).json({
              success: 1,
              message: 'Category list found successfully',
              count: totalCategories[0]['count(*)'],
              page_size: requestedData.limit,
              page_number: requestedData.page_number,
              data: final_response,
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'No category list found',
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
export default new CategoryController(CategoryService);
