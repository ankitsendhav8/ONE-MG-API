import Joi from 'joi';

const Schemas = Joi.object({
  title: Joi.string().min(3).max(30).required(),

  authorName: Joi.string().min(3).max(30).required(),

  authorEmail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  authorContact: Joi.string().min(7).max(10).required(),

  newsType: Joi.string().min(3).max(30).required(),

  discription: Joi.string().min(5).max(300).required(),

  publishDate: Joi.date(),

  url: Joi.string()
    .required()
    .pattern(
      new RegExp(
        '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$'
      )
    ),
});

module.exports = { '/news/add': Schemas };
