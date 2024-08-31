import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export async function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((err) => {
            alert(err);
            throw err; 
        });
}

export async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.assign("/")
        })
        .catch((err) => {
            alert(err)
        })
}

export async function logOut() {
    return signOut(auth)
}

export function verifyLogin(setUserLogged) {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserLogged(user.uid)
        } else {
            setUserLogged("")
        }
    });
}