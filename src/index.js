require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  'mongodb+srv://simon:Simon5963@cluster0-ts2ac.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to Momgo Instance');
});
mongoose.connection.on('error', (err) => {
  console.error('Error Connecting Mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your Email : ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
