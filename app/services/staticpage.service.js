import db from '../config/database';

class StaticPageService {
  constructor() {}

  getPage = (code) => {
    return db('static_page').select('*').where('vPageCode', code);
  };
}

export default new StaticPageService();
