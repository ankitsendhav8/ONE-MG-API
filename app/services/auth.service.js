import db from '../config/database';

class AuthService {
  constructor() {}

  register = (data) => {
    return db('customer').insert(data);
  };
  registerExistingUser = (data, id) => {
    return db('customer')
      .select()
      .where({
        iCustomerId: id,
      })
      .update(data);
  };

  loginUser = (data, id) => {
    return db('customer')
      .select('iCustomerId')
      .where({
        iCustomerId: id,
      })
      .update(data);
  };

  getPhoneNumber = (data) => {
    return db('customer').select('iCustomerId').where('vPhonenumber', data);
  };
  getEmail = (data) => {
    return db('customer').select().where('vEmail', data);
  };
  getPasswordByEmail = (data) => {
    return db('customer').select().where('vEmail', data);
  };
  getPasswordByPhone = (data) => {
    return db('customer').select().where('vPhonenumber', data);
  };

  loginWithEmail = (data) => {
    return db('customer').select().where('vEmail', data);
  };
  loginWithPhone = (data) => {
    return db('customer').select().where('vPhonenumber', data);
  };

  updateAccessKey = (id, key) => {
    return db('customer').where('iCustomerId', '=', id).update({
      vAccessKey: key,
    });
  };

  getUser = (id, otp) => {
    return db('customer')
      .select('iCustomerId')
      .where({ iCustomerId: id, vOTPCode: otp });
  };
  getUserDetails = (id) => {
    return db('customer').select('*').where({ iCustomerId: id });
  };
  updateOtp = (data, id) => {
    return db('customer')
      .select()
      .where({
        iCustomerId: id,
      })
      .update(data);
  };
  logoutUser = (id) => {
    return db('customer')
      .select()
      .where({
        iCustomerId: id,
      })
      .update({ vAccessKey: '' });
  };
}

export default new AuthService();
