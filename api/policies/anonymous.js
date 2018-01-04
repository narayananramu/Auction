module.exports = function(req, res, next) {
    if (typeof req.session.authenticatedAt != "undefined" && typeof req.session.user != "undefined") {
         return res.redirect('/dashboard');
    }
    else{
        next();
    }
};
