import { useState, useEffect } from 'react';
import { db,auth } from '../../services/firebaseConfig';
import { collection, query, getDocs, where } from "firebase/firestore";
import { formatDate } from '../../hooks/formatDate';
import { TasksContainer, DateTasksTitle } from './styles';

function FetchTasks({ date }) {
    const [tasks, setTasks] = useState({
        morning: [],
        afternoon: [],
        evening: []
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const tasksCollection = collection(db, "usersTasks", user.uid, date);
                    const tasksQuery = query(tasksCollection);
                    const querySnapshot = await getDocs(tasksQuery);

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
                } catch (err) {
                    console.error("Erro ao buscar tarefas:", err);
                    setError("Falha ao buscar tarefas. Tente novamente.");
                }
            } else {
                setError("Usuário não autenticado.");
            }
        };

        fetchTasks();
    }, [auth, date]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className='flex-container'>
            <DateTasksTitle>Tarefas para <span>{formatDate(date)}</span></DateTasksTitle>
            <TasksContainer>
                <h3>Manhã</h3>
                <ul>
                    {tasks.morning.map(task => (
                        <li key={task.id}>
                            {task.name}
                        </li>
                    ))}
                </ul>
            </TasksContainer>
            <TasksContainer>
                <h3>Tarde</h3>
                <ul>
                    {tasks.afternoon.map(task => (
                        <li key={task.id}>
                            {task.name}
                        </li>
                    ))}
                </ul>
            </TasksContainer>
            <TasksContainer>
                <h3>Noite</h3>
                <ul>
                    {tasks.evening.map(task => (
                        <li key={task.id}>
                            {task.name}
                        </li>
                    ))}
                </ul>
            </TasksContainer>
        </div>
    );
}

export default FetchTasks;
