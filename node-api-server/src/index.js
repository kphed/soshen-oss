const express = require('express');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const speedLimiter = require('express-slow-down');

const cors = require('./middleware/cors');
const routes = require('./routes');
const throwError = require('./util/throw-error');
const getUserIpAddress = require('./util/get-user-ip-address');
const { PORT } = require('./config');

const port = PORT || 8200;
const app = express();

app.use(helmet());
app.use('*', cors);
app.use(express.json());

app.use(rateLimiter({
  windowMs: 60 * 1000,
  max: 110,
  handler: (req, res) => {
    const errorMessage = 'Too many requests!';
    throwError(new Error(errorMessage));
    res.status(429).send(errorMessage);
  },
  keyGenerator: req => getUserIpAddress(req),
}));

app.use(speedLimiter({
  windowMs: 60 * 1000,
  delayAfter: 100,
  delayMs: 1000,
  keyGenerator: req => getUserIpAddress(req),
}));

routes(app);

app.use((req, res) => {
  const error = { error: { message: 'Invalid endpoint' } };
  res.status(404).send(error);
  return throwError(new Error(error.error.message));
});

app.listen(port, () => {
  console.log('Node API server is running at http://localhost:', port);
});
