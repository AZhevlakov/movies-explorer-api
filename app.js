require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimitConfig = require('./utils/rateLimitConfig');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { devPort, devDBAddress } = require('./utils/devConfig');

const app = express();
const { PORT = devPort, DB_ADDRESS = devDBAddress } = process.env;
const router = require('./routes');

const limiter = rateLimit(rateLimitConfig);

app.use(helmet());
app.use(limiter);

app.use(express.json());

mongoose.connect(DB_ADDRESS);

app.use(requestLogger); // логгер запросов

app.use(cors());

app.use('/api', router); // обработчик роутов

app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT);
