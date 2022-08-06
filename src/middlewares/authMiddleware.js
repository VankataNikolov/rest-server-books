const { validateToken } = require('../services/authService');


exports.auth = async (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        try {
            const payload = await validateToken(token);
            req.user = payload;
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Invalid access token. Please log in'});
        }
    }

    next();
};