"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
require("dotenv/config");
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const user_model_1 = __importDefault(require("../model/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(Object.assign({}, req.body));
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.CREATED).send({ user: { name: user.name }, token });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new bad_request_1.default("Email/Password is required!");
        // throw createError.BadRequest("Email/password is required!");
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new unauthenticated_1.default("Invalid creadentials");
    }
    const isPasswrodCorrect = yield user.checkPassword(password);
    if (!isPasswrodCorrect) {
        throw new unauthenticated_1.default("Invalid credentials");
    }
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user.name }, token });
});
exports.login = login;
