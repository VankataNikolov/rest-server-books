const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET } = require('../constants');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const blacklist = new Set();

exports.register = async (username, password) => {

    const existing = await User.findOne({ username });

    if (existing) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
        username,
        password: hashedPassword,
    });

    await user.save();

    return createSession(user);
}

exports.login = async (username, password) => {

    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Incorrect username or password');
    }


    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Incorrect username or password');
    }

    return createSession(user);
}

exports.logout = (token) => blacklist.add(token);

async function createSession(user) {

    const payload = {
        username: user.username,
        _id: user._id,
    };

    const accessToken = await jwtSign(payload, SECRET, { expiresIn: "2d" });

    payload.accessToken = accessToken

    return payload;
}

exports.validateToken = (token) => {
    if (blacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }
    const payload = jwtVerify(token, SECRET);

    return payload;
}