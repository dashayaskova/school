export const AUTH_COOKIE_NAME = 'token'
export const AUTH_COOKIE_EXPIRES = 30 * 24 * 60 * 1000;
export const AUTH_COOKIE_SECURE = process.env.SECURE_COOKIE  === "false";
