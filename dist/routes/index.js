"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const auth_route_1 = __importDefault(require("./auth.route"));
const jobs_route_1 = __importDefault(require("./jobs.route"));
const appRouter = (0, express_1.Router)();
appRouter.use("/auth", auth_route_1.default);
appRouter.use("/jobs", authentication_1.default, jobs_route_1.default);
exports.default = appRouter;
