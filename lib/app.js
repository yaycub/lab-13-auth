const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use(express.static('public'));

app.use('/api/v1/auth', require('./routes/auth'));

app.use(require('./middleware/token-verify'));

app.use('/api/v1/favorites', require('./routes/favorites'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
