module.exports = function(req, res, next) {
    if (typeof req.session.authenticatedAt != "undefined" && typeof req.session.user != "undefined" && (req.session.authenticatedA == "Buyer")) {
         return next(); 
    }
    else{
        return res.redirect('/dashboard');
    }
};
