import db from '../config/database';

class MedicineService {
  constructor() {}

  getMedicineList = (data) => {
    console.log('data', data);
    let query = db('medicine')
      .select('*')
      .where('iCategoryId', '=', data.category_id);

    if (data && data.keyword) {
      query
        .andWhere('vMedicineName', 'like', `%${data.keyword}%`)
        .offset(data.limit * (data.page_number - 1))
        .limit(data.limit)
        .orderBy('iMedicineId', 'asc');
    } else {
      query
        .offset(data.limit * (data.page_number - 1))
        .limit(data.limit)
        .orderBy('iMedicineId', 'asc');
    }
    return query;
  };
  getMedicineCounts = (categoryid) => {
    return db('medicine').count().where('iCategoryId', '=', categoryid);
  };
  getMedicineDetail = (category_id) => {
    return db('medicine').select('*').where('iMedicineId', '=', category_id);
  };
}

export default new MedicineService();
