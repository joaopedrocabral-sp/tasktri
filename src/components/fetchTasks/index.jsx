import { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConfig';
import { collection, query, getDocs, where, doc, updateDoc } from "firebase/firestore";
import { TasksContainer, DateTasksTitle, Container } from './styles';
import { getDisplayDate } from '../../hooks/getDisplayDate';

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

    const handleCheckboxChange = async (taskId, isCompleted) => {
        const user = auth.currentUser

        try {
            const taskRef = doc(db, "usersTasks", user.uid, date, taskId)
            await updateDoc(taskRef, { completed: isCompleted })

            setTasks(prevTasks => {
                const updatedTasks = { ...prevTasks }
                const periods = ['morning', 'afternoon', 'evening']

                periods.forEach(period => {
                    updatedTasks[period] = updatedTasks[period].map(task =>
                        task.id === taskId ? { ...task, completed: isCompleted } : task
                    )
                })

                return updatedTasks
            })
        } catch (err) {
            console.error("Erro ao atualizar tarefa:", err);
        }
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <Container>
            <DateTasksTitle>Tarefas para <span>{getDisplayDate(date)}</span></DateTasksTitle>
            <TasksContainer>
                <h3>Manhã</h3>
                <div>
                    <ul>
                        {tasks.morning.map(task => (
                            <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed || false}
                                    onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                                />
                                {task.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </TasksContainer>
            <TasksContainer>
                <h3>Tarde</h3>
                <div>
                    <ul>
                        {tasks.afternoon.map(task => (
                            <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                                />
                                {task.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </TasksContainer>
            <TasksContainer>
                <h3>Noite</h3>
                <div>
                    <ul>
                        {tasks.evening.map(task => (
                            <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                                />
                                {task.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </TasksContainer>
        </Container>
    );
}

export default FetchTasks;