import express from 'express';
import getFirebaseAdmin from './utils/firebase';
import { protectedView } from './middleware';
import {
    AUTH_COOKIE_EXPIRES,
    AUTH_COOKIE_SECURE,
    AUTH_COOKIE_NAME,
} from './utils/constants';

const router = express.Router();

router.get('/user', protectedView, async (req, res) => {
    res.send({
        uid: req.user.uid,
        isAdmin: req.user.admin === true,
        email: req.user.email,
    });
});

router.post('/login', async (req, res) => {
    const admin = await getFirebaseAdmin();

    const idToken = req.body.token;

    try {
        await admin.auth().verifyIdToken(idToken);

        const cookie = await admin.auth().createSessionCookie(idToken, { expiresIn: AUTH_COOKIE_EXPIRES });
        const options = {
            maxAge: AUTH_COOKIE_EXPIRES,
            httpOnly: false,
            secure: AUTH_COOKIE_SECURE,
        };
        res.cookie(AUTH_COOKIE_NAME, cookie, options);
        res.status(200).send();
    } catch (e) {
        console.log('IdToken not valid', e)
        res.status(401).send('Invalid authentication');
    }
});

router.post('/signup', protectedView, async (req, res) => {
    const admin = await getFirebaseAdmin();

    try {
        const user = await admin.auth().createUser({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.name,
            disabled: false
        });
        if (req.body.isAdmin) {
            await admin.auth().setCustomUserClaims(user.uid, { admin: true });
        }

        res.send({
            uid: user.uid,
        });
    } catch (e) {
        res.status(400).send('Bad Request');
    }
});

router.post('/logout', protectedView, async (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.send();
})

export default router;
