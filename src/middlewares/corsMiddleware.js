exports.cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, HEAD, DELETE');

    res.setHeader('Access-Control-Allow-Headers',
        'Content-Type, X-Authorization');

    next();
}