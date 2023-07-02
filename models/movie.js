const mongoose = require('mongoose');
const { urlRegExp } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    nameRU: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      validate: {
        validator(url) {
          return urlRegExp.test(url);
        },
        message: 'Некорректная ссылка на постер',
      },
      required: true,
    },
    trailerLink: {
      type: String,
      validate: {
        validator(url) {
          return urlRegExp.test(url);
        },
        message: 'Некорректная ссылка на трейлер',
      },
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    // country: {
    //   type: String,
    //   required: true,
    // },
    // director: {
    //   type: String,
    //   required: true,
    // },
    // year: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: true,
    // },
    // thumbnail: {
    //   type: String,
    //   validate: {
    //     validator(url) {
    //       return urlRegExp.test(url);
    //     },
    //     message: 'Некорректная ссылка миниатюрного изображения постера',
    //   },
    //   required: true,
    // },
    // nameEN: {
    //   type: String,
    //   required: true,
    // },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
