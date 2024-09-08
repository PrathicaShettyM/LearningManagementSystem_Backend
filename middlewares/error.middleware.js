// handle all errors in case of all next() fails

const errorMiddleware = (error, req, res, next) => {
    req.statusCode = req.statusCode || 500;
    req.message = req.message || "Something went wrong";

    return res.status(req.statusCode).json({
        success: false,
        message: req.message,
        stack: error.stack // stack trace of the util function
    });
}

export default errorMiddleware;