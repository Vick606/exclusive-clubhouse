require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const flash = require('connect-flash');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/messages', messageRoutes);

// Home route
app.get('/', async (req, res) => {
  const Message = require('./models/message');
  try {
    const messages = await Message.getAll();
    res.render('index', { messages });
  } catch (err) {
    next(err);
  }
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));