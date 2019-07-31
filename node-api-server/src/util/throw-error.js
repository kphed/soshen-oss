const throwError = (err) => {
  console.log('\n---ERROR LOG---\n');
  console.log(err);
  console.log('\n---ERROR LOG---\n');

  throw err;
};

module.exports = throwError;
