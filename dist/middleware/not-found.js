"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => res.status(404).send("Route doesnot exist");
exports.default = notFound;