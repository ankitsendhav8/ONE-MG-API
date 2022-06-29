import { query } from 'express';
import db from '../config/database';

class CategoryService {
  constructor() {}

  getCategoryList = (data) => {
    let query = db('category').select('*');

    if (data && data.keyword) {
      query
        .where('vCategoryName', 'like', `%${data.keyword}%`)
        .offset(data.limit * (data.page_number - 1))
        .limit(data.limit);
    } else {
      query.offset(data.limit * (data.page_number - 1)).limit(data.limit);
    }
    return query;
  };
  getCategoryCounts = () => {
    return db('category').count();
  };
}

export default new CategoryService();
