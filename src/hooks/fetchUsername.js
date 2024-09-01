import { db, auth } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const fetchUsername = async (setUsername) => {
    const user = auth.currentUser;

    if (user) {
        try {
            // Referência ao documento "info" dentro da subcoleção "profile"
            const userRef = doc(db, "usersTasks", user.uid, "profile", "info");
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setUsername(data.name);
            } else {
                console.log("Nenhum dado encontrado!");
            }
        } catch (err) {
            console.error("Erro ao buscar o nome do usuário:", err);
        }
    }
};
