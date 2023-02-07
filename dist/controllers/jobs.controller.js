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
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const not_found_1 = __importDefault(require("../errors/not-found"));
const jobs_model_1 = __importDefault(require("../model/jobs.model"));
//read
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(res.locals.user.userId);
    const jobs = yield jobs_model_1.default.find({ createdBy: res.locals.user.userId }).sort("createdAt");
    res.status(http_status_codes_1.StatusCodes.OK).json({ Hits: jobs.length, jobs });
});
exports.getAllJobs = getAllJobs;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const { id: jobId } = req.params;
    const job = yield jobs_model_1.default.findOne({ _id: jobId, createdBy: userId });
    if (!job)
        throw new not_found_1.default(`No job with ${jobId}`);
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.getJob = getJob;
//create
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, userId } = res.locals.user;
    const job = yield jobs_model_1.default.create(Object.assign(Object.assign({}, req.body), { createdBy: userId }));
    res.status(http_status_codes_1.StatusCodes.CREATED).send({ job });
});
exports.createJob = createJob;
//update
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const { params: { id: jobId }, body: { company, position }, } = req;
    if (company == "" || position == "") {
        throw new bad_request_1.default("position or company cannot be empty");
    }
    const job = yield jobs_model_1.default.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!job)
        throw new not_found_1.default(`No job with ${jobId}`);
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.updateJob = updateJob;
//delete
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const { id: jobId } = req.params;
    const job = yield jobs_model_1.default.findByIdAndRemove({
        _id: jobId,
        createdBy: userId,
    });
    if (!job)
        throw new not_found_1.default(`No job with ${jobId}`);
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "success", job });
});
exports.deleteJob = deleteJob;
