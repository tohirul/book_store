const responseSender = (res, data) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
  };
  if (data?.meta) responseData.meta = data.meta;
  if (data?.data) responseData.data = data.data;

  res.status(responseData.statusCode).json(responseData);
};

export default responseSender;
