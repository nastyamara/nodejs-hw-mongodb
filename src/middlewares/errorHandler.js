import { HttpError } from 'http-errors';

const errorHandler = (error, req, res, next) => {
if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

    const { status = 500, message = "Something went wrong" } = error;
    res.status(status).json({
        status,
        message,
        data: error
    })
};

export default errorHandler;