const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: "Wlcome to Home page"});
});

module.exports = router;