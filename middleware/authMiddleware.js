exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'Please log in to view this resource');
    res.redirect('/login');
  };
  
  exports.ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.is_admin) {
      return next();
    }
    req.flash('error', 'You do not have permission to perform this action');
    res.redirect('/');
  };