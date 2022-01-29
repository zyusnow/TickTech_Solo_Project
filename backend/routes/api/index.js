const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const typesRouter = require('./types.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/types', typesRouter)


module.exports = router;
