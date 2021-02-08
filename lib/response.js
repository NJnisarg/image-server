const response = (
    res,
    success,
    message,
    data,
    statusCode
  ) => {
    const resp = { success, message, data };
    res.set({
      'Access-Control-Expose-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,OPTIONS,DELETE,PATCH,HEAD',
      'Access-Control-Allow-Credentials': true,
    });
    return res.json(resp).status(statusCode);
  };

module.exports = {
    response,
};
  