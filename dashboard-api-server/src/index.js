const express = require('express');
const rateLimiter = require('express-rate-limit');
const speedLimiter = require('express-slow-down');
const helmet = require('helmet');
const getUserIpAddress = require('./util/get-user-ip-address');
const { PORT } = require('./config');
const {
  projectRoutes,
  statsRoutes,
} = require('./routes');
const cors = require('./middleware/cors');

const app = express();

app.use('*', cors);

app.use(rateLimiter({
  windowMs: 60 * 1000,
  max: 200,
  handler: (req, res) => {
    const errorMessage = 'Too many requests!';

    res.status(429).send({
      error: { message: errorMessage },
    });

    throw new Error(errorMessage);
  },
  keyGenerator: req => getUserIpAddress(req),
}));

app.use(speedLimiter({
  windowMs: 60 * 1000,
  delayAfter: 190,
  delayMs: 500,
  keyGenerator: req => getUserIpAddress(req),
}));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/project/', projectRoutes);
app.use('/api/stats/', statsRoutes);

app.use((req, res) => {
  const errorMessage = 'Invalid endpoint';

  res.status(404).send({
    error: { message: errorMessage },
  });

  throw new Error(errorMessage);
});

app.listen(PORT, () => console.log(`Dashboard API server is running at http://localhost:${PORT}`));
