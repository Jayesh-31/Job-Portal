function auth(req, res, next){
    if(req.session.userEmail){
        req.loginStatus = true;
    } else {
        req.loginStatus = false;
    }
    next();
}

export default auth;