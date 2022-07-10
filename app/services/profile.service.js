import db from '../config/database';

class ProfileService {
  constructor() {}

  getUserDetails = (id) => {
    return db('customer').select('*').where({ iCustomerId: id });
  };

  updateUserDetails = (data, id) => {
    return db('customer')
      .select()
      .where({
        iCustomerId: id,
      })
      .update(data);
  };
}

export default new ProfileService();
