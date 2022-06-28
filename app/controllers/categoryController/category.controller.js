import { result } from 'lodash';
import categoryService from '../../services/category.service';
import CategoryService from '../../services/category.service';

class CategoryController {
  constructor(categoryService) {
    this.CategoryService = categoryService;
  }

  getCategory = async (req, res, next) => {
    try {
      let requestedData = req.body;
      let totalCategories = await categoryService.getCategoryCounts();
      let result = await categoryService.getCategoryList(requestedData);

      if (result && result.length) {
        let final_response = [];
        result.forEach((element) => {
          let obj = {
            category_id: element.iCategoryId,
            category_name: element.vCategoryName,
            category_image: process.env.IMAGE_PATH + element.vCategoryImage,
            status: element.eStatus,
            added_date: element.dAddedDate,
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
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong please try again',
      });
    }
  };
}
export default new CategoryController(CategoryService);
