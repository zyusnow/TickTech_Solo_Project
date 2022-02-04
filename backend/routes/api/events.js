const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const {Event, Venue, Type, User}=require('../../db/models');
const router = express.Router();


const validateEvent = [
    check("name")
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide an event name.')
        .isLength({ max: 50 })
        .withMessage('Event name needs to be less than 50 characters.'),
    check("date")
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide a date for your event.'),
    check('capacity')
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("Please provide a number for your event's capacity."),
    check('description')
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage("Please provide a description for your event.")
        .isLength({ max: 1000 })
        .withMessage('Event description needs to be less than 1000 characters.'),
    check('virtual')
        .if((value, { req }) => req.body.published)
        .notEmpty()
        .withMessage("Please provide an event location."),
    check('virtualUrl')
        .if((value, { req }) => req.body.published)
        .if((value, { req }) => req.body.virtual)
        .exists({ checkFalsy: true })
        .withMessage("Please provide a virtual url.")
        .isURL()
        .withMessage("Please provide a valid url.")
        .isLength({ max: 200 })
        .withMessage("Please provide a valid vitual url with max 200 length."),
    check('imgUrl')
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .isURL()
        .isLength({ max: 200 })
        .withMessage("Please provide a valid image Url for your event."),
    check('published')
        .exists()
        .withMessage('Event needs to be either published or draft status'),
    check('venueId')
        .if((value, { req }) => req.body.published)
        .if((value, { req }) => !req.body.virtual)
        .notEmpty()
        .withMessage('Please provide a venue for your event.'),
    check('typeId')
        .if((value, { req }) => req.body.published)
        .notEmpty()
        .withMessage('Please provide a type for your event'),
    // handleValidationErrors
]

// ---------------------get all events_published---------------------
router.get('/',asyncHandler(async function (req, res) {
    // console.log("Get event received")
    const events = await Event.findAll({
        include: [Venue, Type],
        where:{
            published: true
        }
    });
    // console.log("db", events)
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

// ---------------------create one event---------------------
router.post('/add', requireAuth, validateEvent, asyncHandler(async (req, res) => {
    console.log(req);
    const { id } = req.user;
    const { name, date, capacity, description, virtual, virtualUrl, imgUrl, published, venueId, typeId} = req.body;
    console.log(req.body);
    const validateErrors = validationResult(req);
    if (validateErrors.isEmpty()) {
        const event = await Event.create({
            name,
            date,
            capacity,
            description,
            virtual,
            virtualUrl,
            imgUrl,
            published,
            venueId,
            typeId,
            hostId: id
        });
        res.json(event);
    }
    else {
        return res.json(validateErrors)
    }
}));

// ---------------------update one event---------------------
router.post('/:id(\\d+)/edit', requireAuth, validateEvent, asyncHandler(async (req, res) => {
    const { id } = req.user;
    const eventId = parseInt(req.params.id, 10);
    const eventToUpdate = await Event.findByPk(eventId);
    const hostId = eventToUpdate.hostId;
    // console.log("editroutes",hostId)
    // console.log("editrouteseventId",eventId)
    // console.log("editroutesevent",eventToUpdate)
    // console.log("editroutes",hostId)
    const { name, date, capacity, description, virtual, virtualUrl, imgUrl, published, venueId, typeId} = req.body;
    if (id === hostId) {
        if (validateErrors.isEmpty()) {
            const event = await eventToUpdate.update({name, date, capacity, description, virtual, virtualUrl, imgUrl, published, venueId, typeId});
            return res.json(event)
        } else {
            res.json(validateErrors)
        }
    }
}))

// ---------------------delete one event---------------------
router.delete('/:id(\\d+)', requireAuth, validateEvent, asyncHandler(async function (req, res) {
    //console.log(req);
    const eventId = parseInt(req.params.id, 10);
    const event = await Event.findByPk(eventId);
    const hostId = event.hostId;
    // console.log("hihi", req.session)
    const { id } = req.user;
    console.log("deleteroute_id", id)
    if (id === hostId) {
        await event.destroy();
        return res.json()
    }
}))


module.exports = router;
