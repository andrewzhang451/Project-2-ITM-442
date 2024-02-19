// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Create the Express application
const app = express();

// Set up Pug as the view engine
app.set('view engine', 'pug');

// Use body-parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define the path for the JSON file to store contacts
const DATA_FILE = path.join(__dirname, 'contacts.json');

// Function to read contacts from the JSON file
function readContacts() {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch (error) {
    return []; // Return an empty array if the file doesn't exist or can't be parsed
  }
}

// Function to write contacts to the JSON file
function writeContacts(contacts) {
  const data = JSON.stringify(contacts, null, 2);
  fs.writeFileSync(DATA_FILE, data);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  app.use(bodyParser.urlencoded({ extended: true }));

});




module.exports = app;
