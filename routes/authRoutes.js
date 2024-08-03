const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/join-club', ensureAuthenticated, authController.getJoinClub);
router.post('/join-club', ensureAuthenticated, authController.postJoinClub);

module.exports = router;