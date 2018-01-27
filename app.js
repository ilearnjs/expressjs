const path = require('path');
const express = require('express');
const app = express();

const blogsRoute = require('./routes/blogs');
const indexRoute = require('./routes/index');

app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.json());
app.use('/blogs', blogsRoute);
app.use('*', indexRoute);

module.exports = app;