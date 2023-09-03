const express = require("express")
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passportLocal = require('./config/passport-local-strategy');
const app = express()

const PORT = 9000


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// set the assets
app.use(express.static('./assets'));
app.use(expressLayouts);

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// mongo store is used to store the session cookie in the db

const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/student-record-app', // Replace with your MongoDB URI
  collection: 'sessions',
});
store.on('error', (error) => {
  console.error('MongoDB session store error:', error);
});

// Configure sessions

app.use(
  session({
    secret: 'student-record-app',
    resave: false,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100 * 24,
    },
    store: store,
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use express router
app.use('/', require('./routes'));
app.listen(PORT, function (err)
{
    if (err) {
        console.log("Error in running the server", err)
        return
    }

    console.log("Server is running on port",PORT)
})