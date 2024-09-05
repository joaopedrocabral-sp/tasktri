import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function register(email, password, name) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(db, "usersTasks", user.uid, "profile", "info");
        await setDoc(userRef, { name: name || 'Usuário' });

        return user;
    } catch (err) {
        console.error("Erro ao criar o usuário ou documento:", err);
        alert(err.message);
        throw err;
    }
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