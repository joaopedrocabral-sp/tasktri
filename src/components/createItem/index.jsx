import { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { Modal, ModalContent, CancelButton, ConfirmButton, FormContainer, FormInput, ButtonDiv } from './styles';

function CreateItem({ onClose }) {
    const [itemName, setItemName] = useState("");
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
            const listCollection = collection(db, "usersTasks", userId, "lista");
            await addDoc(listCollection, {
                name: itemName,
                completed: false,
                createdAt: new Date()
            });

            setSuccess("Item adicionado com sucesso!");
            setItemName("");

            setTimeout(() => {
                if (onClose) onClose();
            }, 500);
        } catch (err) {
            console.error("Erro ao adicionar item:", err);
            setError("Falha ao adicionar o item. Tente novamente.");
        }
    };

    return (
        <Modal>
            <ModalContent>
                <h2>Adicionar Item à Lista</h2>
                <FormContainer onSubmit={handleSubmit}>
                    <div className='w-100'>
                        <label htmlFor="itemName">Item</label>
                        <FormInput
                            type="text"
                            id="itemName"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        />
                    </div>
                    <ButtonDiv>
                        <ConfirmButton type="submit">Adicionar</ConfirmButton>
                        <CancelButton onClick={onClose}>Cancelar</CancelButton>
                    </ButtonDiv>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </FormContainer>
            </ModalContent>
        </Modal>
    );
}

export default CreateItem;