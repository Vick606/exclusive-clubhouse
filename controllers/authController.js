const passport = require('passport');
const User = require('../models/user');

exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.postSignup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/signup');
    }
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      req.flash('error', 'Email already in use');
      return res.redirect('/signup');
    }
    const newUser = await User.create({ firstName, lastName, email, password, isAdmin: false });
    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to the Exclusive Clubhouse!');
      res.redirect('/');
    });
  } catch (err) {
    next(err);
  }
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success', 'You have been logged out');
    res.redirect('/');
  });
};

exports.getJoinClub = (req, res) => {
  res.render('join-club');
};

exports.postJoinClub = async (req, res, next) => {
  try {
    const { passcode } = req.body;
    if (passcode !== process.env.CLUB_PASSCODE) {
      req.flash('error', 'Incorrect passcode');
      return res.redirect('/join-club');
    }
    await User.updateMemberStatus(req.user.id, true);
    req.flash('success', 'Welcome to the club!');
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};