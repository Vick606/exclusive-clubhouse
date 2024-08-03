const Message = require('../models/message');

exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.getAll();
    res.render('index', { messages });
  } catch (err) {
    next(err);
  }
};

exports.getCreateMessage = (req, res) => {
  res.render('create-message');
};

exports.postCreateMessage = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    await Message.create({ title, text, userId: req.user.id });
    req.flash('success', 'Message created successfully');
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    await Message.delete(req.params.id);
    req.flash('success', 'Message deleted successfully');
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};