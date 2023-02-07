"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobsSchema = new mongoose_1.default.Schema({
    company: {
        type: String,
        required: [true, "Company name is required!"],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, "Position is required!"],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
}, { timestamps: true } //createdAt and updatedAt automatically
);
exports.default = mongoose_1.default.model("Job", JobsSchema);
