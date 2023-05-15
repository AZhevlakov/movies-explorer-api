const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, register } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { registerValidate, loginValidate } = require('../middlewares/preValidate');
const { NotFoundError } = require('../errors');

router.post('/signin', loginValidate, login);
router.post('/signup', registerValidate, register);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('/', auth, (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
