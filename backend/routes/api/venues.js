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


