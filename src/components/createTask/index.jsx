import { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { Modal, ModalContent, CancelButton, ConfirmButton, FormContainer, FormInput, FormSelect, ButtonDiv } from './styles';

function CreateTask({ onClose }) {
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [period, setPeriod] = useState("morning");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
        } else {
            setError("Usuário não autenticado.");
        }
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!userId) {
            setError("Usuário não autenticado.");
            return;
        }

        try {
            const formattedDate = taskDate;

            const tasksCollection = collection(db, "usersTasks", userId, formattedDate);
            await addDoc(tasksCollection, {
                name: taskName,
                period: period,
                createdAt: new Date()
            });

            setSuccess("Tarefa criada com sucesso!");
            setTaskName("");
            setTaskDate("");
            setPeriod("morning");

            setTimeout(() => {
                if (onClose) onClose();
            }, 2000);
        } catch (err) {
            console.error("Erro ao criar tarefa:", err);
            setError("Falha ao criar a tarefa. Tente novamente.");
        }
    };

    return (
        <Modal>
            <ModalContent>
                <h2>Criar Tarefa</h2>
                <FormContainer onSubmit={handleSubmit}>
                    <div className='w-100'>
                        <label htmlFor="taskName">Tarefa</label>
                        <FormInput
                            type="text"
                            id="taskName"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-100'>
                        <label htmlFor="taskDate">Data</label>
                        <FormInput
                            type="date"
                            id="taskDate"
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-100'>
                        <label htmlFor="period">Período</label>
                        <FormSelect
                            id="period"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            required
                        >
                            <option value="morning">Manhã</option>
                            <option value="afternoon">Tarde</option>
                            <option value="evening">Noite</option>
                        </FormSelect>
                    </div>
                    <ButtonDiv>
                        <ConfirmButton type="submit">Criar Tarefa</ConfirmButton>
                        <CancelButton onClick={onClose}>Cancelar</CancelButton>
                    </ButtonDiv>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </FormContainer>
            </ModalContent>
        </Modal>
    );
}

export default CreateTask;
