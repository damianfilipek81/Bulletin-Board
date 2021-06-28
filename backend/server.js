const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./config/passport');
require('dotenv').config();
const fs = require('fs');

const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

/* MIDDLEWARE */
app.use(session({
  secret: 'deliciousCookie',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', postsRoutes);
app.use('/auth', authRoutes);
app.use('/user', usersRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, './uploads')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

try {
  fs.mkdirSync(path.join(__dirname, '/backend/uploads/'));
} catch (err) {
  if (err.code !== 'EEXIST') throw err;
}

/* MONGOOSE */
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lzufo.mongodb.net/bulletBoardDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
