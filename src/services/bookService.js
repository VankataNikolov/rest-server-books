const Book = require('../models/Book');

exports.getAll = () => Book.find();

exports.getAllByUserId = (owner) => Book.find({ owner });

exports.getAllLikedByUser = (userId) => Book.find({ likes: userId });

exports.getAllByCategory = (bookCategory) => Book.find({ category: bookCategory });

exports.getOneById = (bookId) => Book.findById(bookId);

exports.createOne = async (bookData, userId) => {
    const newBook = new Book({
        title: bookData.title,
        author: bookData.author,
        category: bookData.category,
        description: bookData.description,
        imageUrl: bookData.imageUrl,
        year: bookData.year,
        owner: userId
    });

    await newBook.save();
    return newBook;
}

exports.update = async (bookId, bookData) => {
    const book = await Book.findById(bookId);

    book.title = bookData.title;
    book.author = bookData.author;
    book.category = bookData.category;
    book.description = bookData.description;
    book.imageUrl = bookData.imageUrl;
    book.year = bookData.year;
    book.updated_at = Date.now();

    await book.save();
    return book;
}

exports.addComment = async (bookId, commentId) => {
    const book = await Book.findById(bookId);
    book.comments.push(commentId);
    return book.save();
}

exports.like = async (bookId, userId) => {
    const book = await Book.findById(bookId);
    book.likes.push(userId);
    return book.save();
}

exports.deleteById = (bookId) => Book.findByIdAndDelete(bookId);