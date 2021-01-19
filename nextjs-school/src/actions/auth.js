import getFirebase from '../firebase/firebase';

export const signOut = async (onSuccess, onError) => {
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
    } catch (e){
        if (onError) onError();
    }
};

export const signIn = async (email, password, onSuccess, onError) => {
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
    } catch (e){
        if (onError) onError();
    }
};

const postUserToken = async (token) => {
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
