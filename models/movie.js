const mongoose = require('mongoose');
const { urlRegExp } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
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
    thumbnail: {
      type: String,
      validate: {
        validator(url) {
          return urlRegExp.test(url);
        },
        message: 'Некорректная ссылка миниатюрного изображения постера',
      },
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
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);