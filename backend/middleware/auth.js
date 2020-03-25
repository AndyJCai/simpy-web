class Middleware {
    verify = (app) => {
        app.use('/auth', function(req, res, next) {
            if(!req.headers['access']){
                res.status(403);
                return;
            }
            next();
        });
    }

    static get_current_user = (req) => {
        if (req == null)
            return null;
        console.log(req.headers['access']);
        return req.headers['access'];
    }

}


module.exports = {
    Middleware
}