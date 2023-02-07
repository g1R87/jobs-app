"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const bad_request_1 = __importDefault(require("./bad-request"));
const custom_api_1 = __importDefault(require("./custom-api"));
const not_found_1 = __importDefault(require("./not-found"));
const unauthenticated_1 = __importDefault(require("./unauthenticated"));
exports.errors = {
    CustomAPIError: custom_api_1.default,
    UnauthenticatedError: unauthenticated_1.default,
    NotFoundError: not_found_1.default,
    BadRequestError: bad_request_1.default,
};
