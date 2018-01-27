const express = require('express');
const app = express();
const blogsRoutes = require('./routes/blogs');

app.use(express.json());

app.use('/blogs', blogsRoutes);

module.exports = app;