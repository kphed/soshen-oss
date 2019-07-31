module.exports = routeMethod => async (req, res) => {
  try {
    const results = await routeMethod(req, res);
    res.send(results);
  } catch (err) {
    res.status(400);

    res.send({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }
};
