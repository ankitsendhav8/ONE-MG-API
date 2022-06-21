"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AuthService {
  constructor() {
    _defineProperty(this, "register", data => {
      return (0, _database.default)('customer').insert(data);
    });

    _defineProperty(this, "registerExistingUser", (data, id) => {
      return (0, _database.default)('customer').select().where({
        iCustomerId: id
      }).update(data);
    });

    _defineProperty(this, "loginUser", (data, id) => {
      return (0, _database.default)('customer').select('iCustomerId').where({
        iCustomerId: id
      }).update(data);
    });

    _defineProperty(this, "getPhoneNumber", data => {
      return (0, _database.default)('customer').select('iCustomerId').where('vPhonenumber', data);
    });

    _defineProperty(this, "getEmail", data => {
      return (0, _database.default)('customer').select().where('vEmail', data);
    });

    _defineProperty(this, "getPasswordByEmail", data => {
      return (0, _database.default)('customer').select().where('vEmail', data);
    });

    _defineProperty(this, "getPasswordByPhone", data => {
      return (0, _database.default)('customer').select().where('vPhonenumber', data);
    });

    _defineProperty(this, "loginWithEmail", data => {
      return (0, _database.default)('customer').select().where('vEmail', data);
    });

    _defineProperty(this, "loginWithPhone", data => {
      return (0, _database.default)('customer').select().where('vPhonenumber', data);
    });

    _defineProperty(this, "updateAccessKey", (id, key) => {
      return (0, _database.default)('customer').where('iCustomerId', '=', id).update({
        vAccessKey: key
      });
    });

    _defineProperty(this, "getUser", (id, otp) => {
      return (0, _database.default)('customer').select('iCustomerId').where({
        iCustomerId: id,
        vOTPCode: otp
      });
    });

    _defineProperty(this, "getUserDetails", id => {
      return (0, _database.default)('customer').select('*').where({
        iCustomerId: id
      });
    });

    _defineProperty(this, "updateOtp", (data, id) => {
      return (0, _database.default)('customer').select().where({
        iCustomerId: id
      }).update(data);
    });
  }

}

var _default = new AuthService();

exports.default = _default;