import db from '../config/database';

class AuthService {
  constructor() {}

  signup = (data) => {
    return db('user').insert(data);
  };

  login = (data) => {
    return db('user').select().where('userEmail', data);
  };
  getpassword = (data) => {
    return db('user').select().where('userEmail', data);
  };
  getUser = (data) => {
    return db('user').select().where('id', data);
  };
  forgotPassword = (data) => {
    return db('user').select().where('userEmail', data);
  };
  updatePassword = (data) => {
    return db('user')
      .select()
      .where({
        id: data.id,
      })
      .update(data);
  };
}

export default new AuthService();
