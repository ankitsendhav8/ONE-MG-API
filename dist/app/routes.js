"use strict";

var _express = require("express");

var _authController = _interopRequireDefault(require("./controllers/authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/auth', _authController.default);
module.exports = router;