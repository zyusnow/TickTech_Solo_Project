const express = require('express');
const asyncHandler = require('express-async-handler');
const {Type}=require('../../db/models');
const router = express.Router();

router.get('/',asyncHandler(async function (req, res) {
    // console.log("Get type received")
    const types = await Type.findAll();
    // console.log("db", types)
    return res.json(types)
}))

module.exports = router;
