const responseMiddleWare = (err, req, res, next) => {
  const statusCode = res?.statusCode ? res.statusCode : 500;
  console.log("middleware---->", statusCode);
  return res.status(statusCode).json({
    message: err.message,
    statusCode,
    stack: err.stack,
  });
};

export { responseMiddleWare };
