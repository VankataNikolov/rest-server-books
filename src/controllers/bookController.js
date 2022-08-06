const express = require('express');
const router = express.Router();

const bookService = require('../services/bookService');
const commentService = require('../services/commentService');

router.get('/', async (req, res) => {
    const bookList = await bookService.getAll();
    res.json(bookList);
});

router.post('/', async (req, res) => {
    try {
        const bookData = req.body;
        const userId = req.user._id;

        const newBook = await bookService.createOne(bookData, userId);

        res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }


});

router.get('/catalog/:bookCategory', async (req, res) => {
    const bookCategory = req.params.bookCategory;
    const booksByCategory = await bookService.getAllByCategory(bookCategory);

    res.json(booksByCategory);
});

router.get('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const book = await bookService.getOneById(bookId).populate('owner');
        const commentsDetails =
            await commentService.getAllByBookId(bookId)
                                .sort({created_at: -1})
                                .populate('owner')

        const commentsData = commentsDetails ? commentsDetails : [];

        res.json({ book, commentsData });
    } catch (err) {
        res.json(err.message);
    }

});

router.put('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const bookData = req.body;

    try{
        const updatedBook = await bookService.update(bookId, bookData);
        res.json(updatedBook);
    }catch(err){
        console.log(err);
        res.json(err.message);
    }
});

router.delete('/:bookId', async (req, res) => {
    const bookIid = req.params.bookId;

    try {
        const result = await bookService.deleteById(bookIid);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: `Item ${bookIid} not found` });
    }
});

router.post('/:bookId/like', async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;

    try{
        const book = await bookService.like(bookId, userId);
        res.json(book);
    } catch(err){
        console.log(err.message);
        res.json(err.message);
    }
})

router.post('/:bookId/comment', async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;
    const data = req.body;

    const commentData = {
        text: data.text,
        owner: userId,
        bookId
    }
    try {
        const comment = await commentService.createOne(commentData);
        const commentDetails = await commentService.getOneById(comment._id).populate('owner');
        const book = await bookService.addComment(bookId, comment._id);
        
        res.json({ book, commentDetails });
    } catch (err) {
        res.json(err.message);
    }

});

module.exports = router;