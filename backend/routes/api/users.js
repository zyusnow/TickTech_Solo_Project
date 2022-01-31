const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Venue, Type } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// signup validation: check if errors exist and if so, handle errors
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Username must have at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// POST /api/users (sign up)
router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({ user });
}));

router.get('/:userId/events', asyncHandler(async function(req, res){
    const userId = parseInt(req.params.userId, 10);
    const events = await Spot.findAll({
        where: {
            hostId: userId,
        },
        include: [User, Venue, Type]
    })
    return res.json(events);
  }))


router.get('/:userId/events/published', asyncHandler(async function(req, res){
    const userId = parseInt(req.params.userId, 10);
    const events = await Spot.findAll({
        where: {
            hostId: userId,
            published: true
        },
        include: [User, Venue, Type]
    })
    return res.json(events);
  }))


  router.get('/:userId/events/drafts', asyncHandler(async function(req, res){
    const userId = parseInt(req.params.userId, 10);
    const events = await Spot.findAll({
        where: {
            hostId: userId,
            published: false
        },
        include: [User, Venue, Type]
    })
    return res.json(events);

}))

module.exports = router;
