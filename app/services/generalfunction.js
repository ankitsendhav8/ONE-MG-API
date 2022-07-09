import db from '../config/database';
import moment from 'moment';

class GeneralFunctionService {
  constructor() {}
  getCurrentTime = () => moment().format('HH:mm:ss');
  getCurrentDateTime = () => moment().format('YYYY-MM-DD HH:mm:ss');

  changeDate = (value) => {
    let dstfmt = 'DD/MM/YYYY';

    if (!value || value === '0000-00-00') return value;
    if (!moment(value).isValid()) return value;
    return moment(value).format(dstfmt);
  };
}

export default new GeneralFunctionService();
