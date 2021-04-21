"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
var express_1 = require("express");
var ormconfig_1 = __importDefault(require("../../ormconfig"));
var typeorm_1 = require("typeorm");
var router = express_1.Router();
var connect = function (req, res, next, connection) {
    typeorm_1.createConnection(ormconfig_1.default)
        .then(function (db_connection) {
        connection = db_connection;
    })
        .catch(function (e) { return res.json({ error: e }); });
};
exports.connect = connect;
