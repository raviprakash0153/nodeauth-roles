require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const route = require('./routes/users');
const cookieParser = require('cookie-parser');

//connect database
const db =
  'mongodb+srv://Ravi:0153ravi@cluster0.agc7k.mongodb.net/nodeauth?retryWrites=true&w=majority';
try {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection.on('connected', () => {
    console.log(`mongo connected `);
  });
} catch (err) {
  console.log('mongo not connected');
}
///
mongoose.connection.on('error', (err) => {
  console.log(`mongo connected to ${err}`);
});

const app = express();

//cors middleware allows us to access our routes from other domain name
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//set static files
//app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/users', route);

app.get('/', (req, res) => {
  res.send('Homepage');
  //  console.log(process.env.SECRET_KEY);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
