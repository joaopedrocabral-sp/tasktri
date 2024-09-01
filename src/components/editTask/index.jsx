import { useState } from 'react';
import { db, auth } from '../../services/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Modal, ModalContent, FormContainer, FormInput, FormSelect, ButtonDiv, ConfirmButton, CancelButton, DeleteButton } from './styles';

function EditTaskModal({ task, date, onClose }) {
    const [taskName, setTaskName] = useState(task.name)
    const [period, setPeriod] = useState(task.period)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleEdit = async (e) => {
        e.preventDefault()

        try {
            const user = auth.currentUser
            if (user) {
                const taskRef = doc(db, "usersTasks", user.uid, date, task.id)
                await updateDoc(taskRef, { name: taskName, period })

                setSuccess("Tarefa atualizada com sucesso!")
                setTimeout(() => {
                    onClose()
                }, 500)
            } else {
                setError("Usuário não autenticado.")
            }
        } catch (err) {
            console.error("Erro ao atualizar tarefa:", err)
            setError("Erro ao atualizar tarefa.")
        }
    };

    const handleDelete = async () => {
        try {
            const user = auth.currentUser
            if (user) {
                const taskRef = doc(db, "usersTasks", user.uid, date, task.id)
                await deleteDoc(taskRef)

                setSuccess("Tarefa excluída com sucesso!")
                setTimeout(() => {
                    onClose()
                }, 500);
            } else {
                setError("Usuário não autenticado.")
            }
        } catch (err) {
            console.error("Erro ao excluir tarefa:", err)
            setError("Erro ao excluir tarefa.")
        }
    };

    return (
        <Modal>
            <ModalContent>
                <h2>Editar Tarefa</h2>
                <FormContainer>
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
                        <ConfirmButton onClick={handleEdit}>Salvar</ConfirmButton>
                        <DeleteButton onClick={handleDelete}>Excluir</DeleteButton>
                    </ButtonDiv>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </FormContainer>
                <CancelButton onClick={onClose}>Cancelar</CancelButton>
            </ModalContent>
        </Modal>
    );
}

export default EditTaskModal;
