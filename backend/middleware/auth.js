class Middleware {
    verify = (app) => {
        app.use('/auth', function(req, res, next) {
            if(!req.headers['access']){
                res.status(401);
                return;
            }
            next();
        });
    }

    get_current_user = (req) => { //FIXME: this function doesn't actually work?
        if (req == null)
            return null;
        return req.headers['access'].split("Bearer ")[1];
    }

    get_auth_token = (req) => {
        if (req.cookies['access_token'] == null)
            return;
        return req.cookies['access_token'];
    }

}


module.exports = {
    Middleware
}