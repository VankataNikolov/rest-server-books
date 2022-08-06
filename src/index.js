const express = require('express');

const { PORT } = require('./constants');

const { dbInitialize } = require('./config/database');
const { dataInit } = require('./config/database');
const { auth } = require('./middlewares/authMiddleware');
const { cors } = require('./middlewares/corsMiddleware');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(cors);
app.use(auth);
app.use(routes);

dbInitialize()
    .then(() => {
        app.listen(PORT, () => console.log(`App is listening on port ${PORT}...`));
    })
    .then(() => {
        dataInit()
    })
    .then(() => console.log('data init is resolved'))
    .catch((err) => {
        console.log('Cannot connect to database:', err);
    });