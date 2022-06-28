import db from '../config/database';

class CategoryService {
  constructor() {}

  getCategoryList = (data) => {
    return db('category')
      .select('*')
      .offset(data.limit * (data.page_number - 1))
      .limit(data.limit);
  };
  getCategoryCounts = () => {
    return db('category').count();
  };
}

export default new CategoryService();
