import { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { TasksContainer, DateTasksTitle, Container, InfoContainer } from './styles';
import { getDisplayDate } from '../../hooks/getDisplayDate';
import { fetchUsername } from '../../hooks/fetchUsername';
import { fetchTasks } from '../../hooks/fetchTasks';
import EditTaskModal from '../editTask';

function FetchTasks({ date }) {
    const [tasks, setTasks] = useState({
        morning: [],
        afternoon: [],
        evening: []
    })
    const [error, setError] = useState(null)
    const [username, setUsername] = useState('')
    const [selectedTask, setSelectedTask] = useState(null)

    useEffect(() => {
        fetchTasks(setTasks, setError, date)
        fetchUsername(setUsername)
    }, [auth, date])

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
            console.error("Erro ao atualizar tarefa:", err)
        }
    }

    const openEditModal = (task) => {
        setSelectedTask(task);
    };

    const closeModal = () => {
        setSelectedTask(null);
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>
    }

    return (
        <Container>
            <InfoContainer>
                <h2>Olá, <span>{username}!</span></h2>
                <DateTasksTitle>Tarefas para <span>{getDisplayDate(date)}</span></DateTasksTitle>
            </InfoContainer>
            <TasksContainer>
                <h3>Manhã</h3>
                <div>
                    <ul>
                        {tasks.morning.map(task => (
                            <li key={task.id} onClick={(e) => {
                                if (e.target.tagName !== 'INPUT') {
                                    openEditModal(task);
                                }
                            }} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
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
                            <li key={task.id} onClick={(e) => {
                                if (e.target.tagName !== 'INPUT') {
                                    openEditModal(task);
                                }
                            }} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
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
                            <li key={task.id} onClick={(e) => {
                                if (e.target.tagName !== 'INPUT') {
                                    openEditModal(task);
                                }
                            }} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
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

            {selectedTask && (
                <EditTaskModal
                    task={selectedTask}
                    date={date}
                    onClose={closeModal}
                />
            )}
        </Container>
    )
}

export default FetchTasks;