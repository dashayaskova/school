import getFirebaseAdmin from './utils/firebase';
import { AUTH_COOKIE_NAME } from './utils/constants';


export const protectedView = async (req, res, next) => {
    const cookie = req.cookies[AUTH_COOKIE_NAME];
    if (!cookie) {
        res.status(401).send('Authentification cookie missing');
        return;
    }

    const admin = await getFirebaseAdmin();
    if (!admin) {
        res.status(500).send();
        return;
    }

    try {
        const decoded = await admin.auth().verifySessionCookie(cookie, true);
        req.user = decoded
    } catch (e) {
        res.status(401).send();
    }

    next();
}
