const express = require('express');
const asyncHandler = require('express-async-handler');
const {Type}=require('../../db/models');
const router = express.Router();

router.get('/',asyncHandler(async function (req, res) {
    const types = await Type.findAll();
    return res.json(types)
}))

router.get('/:id(\\d+)',asyncHandler(async function (req, res) {
    const typeId = parseInt(req.params.id, 10);
    const type = await Type.findOne({
        where: { id: typeId },
        include: [Venue, Type, User],
    })
    return res.json(type);
}))

module.exports = router;
