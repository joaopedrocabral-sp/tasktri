import CreateTaskButton from "../../components/createTaskButton";
import { useEffect, useState } from "react";
import { verifyLogin } from "../../hooks/auth";
import CreateTask from "../../components/createTask";
import FetchTasks from "../../components/fetchTasks";
import { DateInput } from "./styles";

function Home() {

    const [userLogged, setUserLogged] = useState(null);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); 

    const handleClick = () => {
        setShowCreateTask(!showCreateTask);
    };

    const closeCreateTaskModal = () => {
        setShowCreateTask(false);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    useEffect(() => {
        verifyLogin(setUserLogged);
    }, []);

    if (userLogged === null) {
        return <div>Carregando...</div>
    }

    if (userLogged) {
        return (
            <div className="section-boxed flex-container">
                <DateInput
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <CreateTaskButton onClick={handleClick} />
                {showCreateTask && <CreateTask onClose={closeCreateTaskModal} />}
                <FetchTasks date={selectedDate} />
            </div>

        )
    } else {
        window.location.assign("/login")
    }
}

export default Home;