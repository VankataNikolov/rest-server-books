const User = require('../models/User');

exports.getById = (userId) => User.findById(userId);

exports.getCount = () => User.countDocuments();