"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post('/register', _auth.default.register);
router.post('/verify-otp', _auth.default.verifyOtp);
router.post('/resend-otp', _auth.default.resendOtp);
router.post('/login', _auth.default.login); // router.post('/login', AuthController.login);
// router.get('/getUser/:id', AuthController.getUser);
// router.post('/forgotpassword', AuthController.forgotpassword);
// router.put('/updatepassword', AuthController.updatepassword);
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

var _default = router;
exports.default = _default;