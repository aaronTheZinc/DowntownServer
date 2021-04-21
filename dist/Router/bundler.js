"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var client_1 = __importDefault(require("./client"));
var router = express_1.Router();
router.use('/client', client_1.default);
exports.default = router;
