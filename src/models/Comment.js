const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'text is required'],
        minlength: [20, 'Text of the comment should be 20 symbols long at least']
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;