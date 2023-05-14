const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidate, idValidate } = require('../middlewares/preValidate');

router.get('/', getMovies);
router.post('/', createMovieValidate, createMovie);
router.delete('/:_id', idValidate, deleteMovie);

module.exports = router;
