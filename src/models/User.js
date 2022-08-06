const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minlength: [4, 'username should be 4 characters at least'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password should be 6 characters at least']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;