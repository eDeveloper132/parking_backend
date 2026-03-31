import type { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  // Handle specific error messages to set status codes if they weren't set
  if (statusCode === 500) {
    if (message.toLowerCase().includes("not found")) {
      statusCode = 404;
    } else if (message.toLowerCase().includes("missing") || message.toLowerCase().includes("invalid")) {
      statusCode = 400;
    }
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(", ");
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Not authorized, token failed";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Not authorized, token expired";
  }

  // Handle Mongoose Connection Errors
  if (err.name === "MongooseServerSelectionError" || err.name === "MongoNetworkError") {
    statusCode = 503;
    message = "Database connection error: Please check if your IP is whitelisted in MongoDB Atlas";
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    data: {},
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
