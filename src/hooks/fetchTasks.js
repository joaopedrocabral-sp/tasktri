import { db, auth } from '../services/firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';

export const fetchTasks = async (setTasks, setError, date) => {
    const user = auth.currentUser;
        if (user) {
            const tasksCollection = collection(db, "usersTasks", user.uid, date);
            const tasksQuery = query(tasksCollection);

            // Listener em tempo real
            const unsubscribe = onSnapshot(tasksQuery, (querySnapshot) => {
                const tasksByPeriod = {
                    morning: [],
                    afternoon: [],
                    evening: []
                };

                querySnapshot.forEach(doc => {
                    const task = doc.data();
                    tasksByPeriod[task.period].push({ id: doc.id, ...task });
                });

                setTasks(tasksByPeriod);
            });

            // Cleanup on unmount
            return () => unsubscribe();
        } else {
            setError("Usuário não autenticado.");
        }
}