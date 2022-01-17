const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const {Event, Venue, Type}=require('../../db/models');
const router = express.Router();


// ---------------------get all events_published---------------------
router.get('/',asyncHandler(async function (req, res) {
    const events = await Event.findAll({
        include: [Venue, Type],
        where:{
            published: true
        }
    });
    console.log("first", events)
    return res.json(events)
}))

// ---------------------get one event_published---------------------
router.get('/:id(\\d+)', asyncHandler(async function (req, res) {
    const eventId = parseInt(req.params.id, 10);
    const event = await Event.findOne({
        where: { id: eventId },
        include: [Venue, Type, User],
    })
    return res.json(event);
}))


// ---------------------delete one event---------------------
router.delete('/:id(\\d+)', asyncHandler(async function (req, res) {
    const eventId = parseInt(req.params.id, 10);
    const event = await Event.findByPk(eventId);
    await Image.destroy({
        where: { spotId }
    })
    await spot.destroy();
    return res.json({})
}))


module.exports = router;
