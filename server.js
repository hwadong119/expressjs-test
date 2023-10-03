const express = require('express');
const path = require('path');
require('dotenv').config();

const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');

const mongoose = require("mongoose");

const PORT = 4000;

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());

mongoose.connect(`mongodb+srv://jhy:${process.env.DB_PASS}@express-cluster.pyltcon.mongodb.net/`)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err))

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`start: ${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`end: ${req.method} ${req.baseUrl} ${req.url} ${diffTime}ms`);
});

app.get('/', (req, res) => {
  res.render('index', {
    imageTitle: 'It is a forest2'
  })
})

app.use('/users', usersRouter);

app.use('/posts', postsRouter);


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})