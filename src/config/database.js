const mongoose = require('mongoose');
const { DB_NAME } = require('../constants');

const { user1, user2, book1, book2 } = require('../dbjson');

const userService = require('../services/userService');
const authService = require('../services/authService');
const bookService = require('../services/bookService');

const connectionString = `mongodb://localhost:27017/${DB_NAME}`;

exports.dbInitialize = () => mongoose.connect(connectionString);

exports.dataInit = async() => {
    const usersCount = await userService.getCount();
    if(usersCount < 1) {
        
        const payloadUser1 = await authService.register(user1.username, user1.password);
        const payloadUser2 = await authService.register(user2.username, user2.password);
    
        const newBook1 = await bookService.createOne(book1, payloadUser1._id);
        const newBook2 = await bookService.createOne(book2, payloadUser2._id);

    }
}
