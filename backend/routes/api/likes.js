const express = require('express');
const asyncHandler = require('express-async-handler');
const {Like}=require('../../db/models');
const router = express.Router();

router.get('/',asyncHandler(async function (req, res) {
    const likes = await Like.findAll();
    return res.json({likes})
}))

router.post("/", asyncHandler(async function (req, res) {
    const { userId, eventId } = req.body;
    const like = await Like.create({
      userId,
      eventId,
    })
    return res.json({like})
}))

router.delete("/:id(\\d+)", asyncHandler(async function (req, res) {
    const likeId = req.body.likeId
    const likeToDelete = await Like.findByPk(likeId)
    if(likeToDelete) {
      await likeToDelete.destroy()
    }
    return res.json(likeToDelete)
}))

module.exports = router;
