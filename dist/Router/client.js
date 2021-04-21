"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/test', function (req, res) {
    res.json({
        message: 'Downtown Api Is Up And Running.....'
    });
});
exports.default = router;
