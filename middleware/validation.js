const { body } = require('express-validator');

exports.validateSignup = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
];

exports.validateMessage = [
  body('title').notEmpty().withMessage('Title is required'),
  body('text').notEmpty().withMessage('Message text is required')
];