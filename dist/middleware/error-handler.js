"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(typeof err);
    let customError = {
        //set default
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong. Try again later",
    };
    //validation error
    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
        customError.statusCode = 400;
    }
    //duplication error
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value for ${Object.keys(err.keyValue)} field, Chose another value`;
        customError.statusCode = 400;
    }
    //casting error
    if (err.name === "CastError") {
        customError.msg = `No item found related to id: ${err.value}`;
        customError.statusCode = 404;
    }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.default = errorHandlerMiddleware;
