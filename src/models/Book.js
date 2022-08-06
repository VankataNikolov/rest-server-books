const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        minlength: [2, 'Title should be 2 symbols long at least']
    },
    author: {
        type: String,
        required: [true, 'author is required'],
        minlength: [2, 'Author should be 2 symbols long at least']
    },
    category: {
        type: String,
        enum: ['technology', 'children', 'fiction', 'hobbies'],
        required: [true, 'category is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minlength: [20, 'Description should be 20 symbols long at least']
    },
    imageUrl: {
        type: String,
        required: [true, 'imageUrl is required'],
        validate: [/^http?/, 'Not a valid image url']
    },
    year: {
        type: Number,
        max: [2022, 'The year {VALUE} should not be higher than 2022'],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updated_at: {
        type: Date,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

});

bookSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;