// onst Venue = sequelize.define('Venue', {
//     name: DataTypes.STRING,
//     address: DataTypes.STRING,
//     city: DataTypes.STRING,
//     state: DataTypes.STRING,
//     zipCode: DataTypes.STRING

const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const {Event, Venue, Type, User}=require('../../db/models');
const router = express.Router();

const validateVenue = [
    check('published')
        .exists()
        .withMessage('Please provide a published status'),
    check("name")
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide a venue name.')
        .isLength({ max: 50 })
        .withMessage('Venue name needs to be less than 50 characters.'),
    check("address")
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide a venue address.')
        .isLength({ max: 100 })
        .withMessage('Venue address needs to be less than 100 characters.'),
    check("city")
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide a venue city.')
        .isLength({ max: 50 })
        .withMessage('Venue city needs to be less than 50 characters.'),
    check("state")
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide a venue state.')
        .isLength({ max: 50 })
        .withMessage('Venue state needs to be less than 50 characters.'),
    check("zipCode")
        .if((value, { req }) => req.body.published)
        .exists({ checkFalsy: true })
        .withMessage('Please provide a zipCode.')
        .isLength({ max: 10 })
        .withMessage('Venue state needs to be less than 10 characters.'),
]

// ---------------------get all venues---------------------
router.get('/',asyncHandler(async function (req, res) {
    const venues = await Venue.findAll()
    return res.json(venues)
}))

// ---------------------get one venue---------------------
router.get('/:id(\\d+)',asyncHandler(async function (req, res) {
    const venueId = parseInt(req.params.venueId, 10);
    const venue = await Venue.findByPk(venueId);
    return res.json(venue)
}))



// ---------------------add one venue---------------------
router.post('/add', requireAuth, validateVenue, asyncHandler(async (req, res) => {
    const {name, address, city, state, zipCode, published} = req.body;
    console.log(req.body);
    const validateErrors = validationResult(req);
    if (validateErrors.isEmpty()) {
        const venue = await Venue.create({name, address, city, state, zipCode, published});
        res.json(venue)
    } else {
        return res.json(validateErrors)
    }
}))

// ---------------------put one venue---------------------
router.put('/:id(\\d+)/edit',asyncHandler(async function (req, res) {
    const venueId = parseInt(req.params.id, 10);
    const venue = await Venue.findByPk(venueId);
    const {name, address, city, state, zipCode, published} = req.body;
    if (validateErrors.isEmpty()) {
        await venue.update({name, address, city, state, zipCode, published})
        const venue = await Venue.findByPk(venueId);
        res.json(venue)
    } else {
        return res.json(validateErrors)
    }
}))


module.exports = router;
