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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const passwords_1 = require("../utils/passwords");
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Provide a valid email!",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minglegth: 6,
    },
});
//pre middleware
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield (0, passwords_1.hashPassword)(this.password);
        //   next(); not required since mongoose 5
    });
});
//instance methods
UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
UserSchema.methods.checkPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, passwords_1.verifyPassword)(password, this.password);
    });
};
exports.default = mongoose_1.default.model("User", UserSchema);
