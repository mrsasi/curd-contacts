exports.errorHandle = (err, res) => {
  const code = err.status || 500;
  const { error } = err;
  res.status(code).send({
    success: false,
    error: error?.message || 'Something went to wrong',
  });
};
