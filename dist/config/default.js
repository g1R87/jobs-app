"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
const port = parseInt(process.env.port, 10);
const accessTokenKey = process.env.JWT_SECRET;
exports.config = {
    port,
    accessTokenKey,
};
