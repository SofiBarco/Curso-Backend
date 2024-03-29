function isProtected (req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
}

function checkLogged (req, res, next) {
    if (req.session.user) return res.redirect("/login");
    next();
}

function checkSession(req, res, next) {
    if (req.session.user) return res.redirect("/");
    next();
}

export { isProtected, checkLogged, checkSession};