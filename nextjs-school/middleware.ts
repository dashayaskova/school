import { RequestHandler } from "express";
import { IGetUserRequest } from './src/utils/userReq';

const AUTH_COOKIE_NAME = 'token';

export const auth: RequestHandler = async (req: IGetUserRequest, res, next) => {
    const cookie = req.cookies[AUTH_COOKIE_NAME];
    if (!cookie) {
        next();
        return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': req.headers['cookie']
    };

    try {
        const response = await fetch('http://auth/auth/user', {
            method: 'GET',
            headers: headers as HeadersInit
        });

        if (response.status !== 200) {
            next();
            return;
        }
        req.user = await response.json();
        req.headers['X-Firebase-Uid'] = req.user?.uid;
        req.headers['X-Firebase-IsAdmin'] = req.user?.isAdmin as string | undefined;
        next();
    } catch(e) {
        next();
    }
}

export const privateView: RequestHandler = (req: IGetUserRequest, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

export const adminView: RequestHandler = (req: IGetUserRequest, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }
}
