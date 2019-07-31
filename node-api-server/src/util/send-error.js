const sendError = (res, status, message) => {
  res.status(status);
  res.send({ error: { message } });
};

module.exports = sendError;
