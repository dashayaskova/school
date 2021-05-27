import getFirebase from '../firebase/firebase';
import {User} from '@firebase/auth-types';

export const signOut = async (onSuccess?: () => void, onError?: () => void) => {
    try {
        const response = await fetch('/auth/logout', {
            method: 'POST',
            credentials: 'same-origin',
        });
        if (response.status === 200) {
            if (onSuccess) onSuccess();
        } else {
            if (onError) onError();
        }
    } catch (e) {
        if (onError) onError();
    }
};

export const signIn = async (email: string, password: string,
   onSuccess: (e: User) => void, onError: () => void) => {
    const firebase = getFirebase();

    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (res && res.user) {
            const status = await postUserToken(await res.user.getIdToken());
            if (status === 200) {
                if (onSuccess) onSuccess(res.user);
            } else {
                if (onError) onError();
            }
        }
    } catch (e) {
        if (onError) onError();
    }
};

export const deleteFirebaseUser = async (uid: string, onSuccess?: () => void, onError?: () => void) => {
    try {
        const { status } = await fetch(`/auth/${uid}`, {
            method: 'DELETE',
            credentials: 'same-origin',
        });

        if (status === 200) {
            if (onSuccess) onSuccess();
        } else {
            if (onError) onError();
        }
    } catch (e) {
        if (onError) onError();
    }
};

const postUserToken = async (token: string) => {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ token })
    });
    return response.status;
}
