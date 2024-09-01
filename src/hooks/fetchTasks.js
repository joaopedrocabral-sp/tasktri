import { db, auth } from '../services/firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';

export const fetchTasks = async (setTasks, setError, date) => {
    const user = auth.currentUser
    if (user) {
        try {
            const tasksCollection = collection(db, "usersTasks", user.uid, date)
            const tasksQuery = query(tasksCollection)
            const querySnapshot = await getDocs(tasksQuery)

            const tasksByPeriod = {
                morning: [],
                afternoon: [],
                evening: []
            };

            querySnapshot.forEach(doc => {
                const task = doc.data()
                tasksByPeriod[task.period].push({ id: doc.id, ...task })
            });

            setTasks(tasksByPeriod)
        } catch (err) {
            console.error("Erro ao buscar tarefas:", err)
            setError("Falha ao buscar tarefas. Tente novamente.")
        }
    } else {
        setError("Usuário não autenticado.")
    }
}