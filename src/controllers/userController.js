const express = require('express');
const router = express.Router();

const authService = require('../services/authService');
const bookService = require('../services/bookService');
const commentService = require('../services/commentService');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await authService.register(username, password);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await authService.login(username, password);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    authService.logout(req.user?.token);
    res.status(204).end();
});

router.get('/:userId/stuff', async (req, res) => {
    const userId = req.params.userId;

    try{
        const books = await bookService.getAllByUserId(userId);
        const likedBooks = await bookService.getAllLikedByUser(userId);

        const result = {
            books,
            likedBooks
        }
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;