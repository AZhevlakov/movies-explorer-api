const Movie = require('../models/movie');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    movieId,
    nameRu,
    image,
    trailerLink,
    duration,
  } = req.body;
  Movie.create({
    movieId,
    nameRu,
    image,
    trailerLink,
    duration,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав доступа');
      }
      return movie.deleteOne();
    })
    .then(() => res.status(200).send({ message: 'Фильм удалён' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный id'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
