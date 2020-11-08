import admin from "firebase-admin";
import config from "./serviceaccount";

const getFirebaseAdmin = async () => {
    
    if (!admin.apps.length) {
        await admin.initializeApp({
            credential: admin.credential.cert(config()),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
        });
    }
    return admin;
}

export default getFirebaseAdmin;
