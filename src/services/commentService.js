const Comment = require('../models/Comment');

exports.createOne = async (data) => {
    const newComment = new Comment({
        text: data.text,
        owner: data.owner,
        bookId: data.bookId
    });

    await newComment.save();
    return newComment;
}

exports.getOneById = (commentId) => Comment.findById(commentId);

exports.getAllByBookId = (bookId) => Comment.find({bookId});

exports.getAllByUserId = (owner) => Comment.find({owner});