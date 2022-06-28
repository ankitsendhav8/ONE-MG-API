import db from '../config/database';

class MedicineService {
  constructor() {}

  getMedicineList = (data) => {
    return db('medicine').insert(data);
  };
}

export default new MedicineService();
