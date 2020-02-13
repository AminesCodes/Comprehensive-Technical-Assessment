require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('./auth/passport')

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const genresRouter = require('./routes/genres');
const showsRouter = require('./routes/shows');
const commentsRouter = require('./routes/comments');
const mySecret = require('./secret');
const { checkUserLogged } = require('./auth/helpers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: mySecret,
    resave: false,
    saveUninitialized: true
  }))
  
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRouter);
app.use('/api/users', checkUserLogged, usersRouter);
app.use('/api/genres', checkUserLogged, genresRouter);
app.use('/api/shows', checkUserLogged, showsRouter);
app.use('/api/comments', checkUserLogged, commentsRouter);

app.use('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
})

module.exports = app;
