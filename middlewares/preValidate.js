const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/constants');

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const registerValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserProfileValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const idValidate = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

const createMovieValidate = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    image: Joi.string().regex(urlRegExp).required(),
    trailerLink: Joi.string().regex(urlRegExp).required(),
    duration: Joi.number().required(),
    // country: Joi.string().required(),
    // director: Joi.string().required(),
    // year: Joi.string().required(),
    // description: Joi.string().required(),
    // thumbnail: Joi.string().regex(urlRegExp).required(),
    // nameEN: Joi.string().required(),
  }),
});

module.exports = {
  loginValidate,
  registerValidate,
  idValidate,
  updateUserProfileValidate,
  createMovieValidate,
};
