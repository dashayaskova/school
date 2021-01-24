const AUTH_COOKIE_NAME = 'token';

const auth = async (req, res, next) => {
    const cookie = req.cookies[AUTH_COOKIE_NAME];
    if (!cookie) {
        next();
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/auth/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': req.headers['cookie']
            }
        });
        if (response.status !== 200) {
            next();
            return;
        }
        req.user = await response.json();
        req.headers['X-Firebase-Uid'] = req.user.uid;
        req.headers['X-Firebase-IsAdmin'] = req.user.isAdmin;
        next();
    } catch(e) {
        next();
    }
}

const privateView = (req, res, next) => {
    console.log(req.url)
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

const adminView = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = {
    auth,
    privateView,
    adminView,
};
