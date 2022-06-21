"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.info = exports.log = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('api:server');
exports.log = log;
const info = (0, _debug.default)('api:info');
exports.info = info;
const error = (0, _debug.default)('api:error');
exports.error = error;