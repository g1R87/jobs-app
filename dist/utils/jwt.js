"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (payload, secret, options) => {
    return (0, jsonwebtoken_1.sign)(payload, secret, options);
};
exports.createToken = createToken;
const verifyToken = (token, secret, options) => {
    return (0, jsonwebtoken_1.verify)(token, secret, options);
};
exports.verifyToken = verifyToken;
