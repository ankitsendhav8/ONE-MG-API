"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schemas = _joi.default.object({
  title: _joi.default.string().min(3).max(30).required(),
  authorName: _joi.default.string().min(3).max(30).required(),
  authorEmail: _joi.default.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net']
    }
  }).required(),
  authorContact: _joi.default.string().min(7).max(10).required(),
  newsType: _joi.default.string().min(3).max(30).required(),
  discription: _joi.default.string().min(5).max(300).required(),
  publishDate: _joi.default.date(),
  url: _joi.default.string().required().pattern(new RegExp('^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$'))
});

module.exports = {
  '/news/add': Schemas
};