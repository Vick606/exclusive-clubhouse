const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/authMiddleware');

router.get('/', messageController.getAllMessages);
router.get('/create', ensureAuthenticated, messageController.getCreateMessage);
router.post('/create', ensureAuthenticated, messageController.postCreateMessage);
router.post('/delete/:id', ensureAdmin, messageController.deleteMessage);

module.exports = router;