import React, { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { FormButton, FormContainer, FormInput, Container, SignOutButton, SubContainer } from './styles';
import { logOut } from '../../hooks/auth';
import { verifyLogin } from '../../hooks/auth';

const Profile = () => {
    const [userLogged, setUserLogged] = useState(null)
    const [username, setUsername] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(() => {
        verifyLogin(setUserLogged)
    }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userRef = doc(db, "usersTasks", user.uid, "profile", "info")
                    const docSnap = await getDoc(userRef)

                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        setUsername(data.name || '')
                    } else {
                        // Criar o documento com um nome de usuário padrão
                        await setDoc(userRef, { name: 'Usuário' })
                        setUsername('Usuário')
                        setMessage("Perfil criado com nome padrão.")
                    }
                } catch (err) {
                    console.error("Erro ao buscar o nome do usuário:", err)
                    setMessage("Erro ao carregar o perfil.")
                } finally {
                    setLoading(false)
                }
            } else {
                setMessage("Usuário não autenticado.")
                setLoading(false)
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe()
        
    }, []);

    const handleNameChange = async () => {
        const user = auth.currentUser

        if (user && newUsername.trim()) {
            try {
                const userRef = doc(db, "usersTasks", user.uid, "profile", "info")
                await updateDoc(userRef, { name: newUsername.trim() })
                setUsername(newUsername.trim())
                setMessage("Nome atualizado com sucesso!")
            } catch (err) {
                console.error("Erro ao atualizar o nome do usuário:", err)
                setMessage("Erro ao atualizar o nome.")
            }
        } else {
            setMessage("Por favor, insira um nome válido.")
        }
    };

    if (userLogged === null) {
        return <div>Carregando...</div>
    }

    if (loading) {
        return <p>Carregando perfil...</p>
    }

    if (userLogged) {
        return (
            <Container className='section-boxed'>
                <SubContainer>
                    <h2>Perfil</h2>
                    <p>Olá, <span>{username}!</span></p>
                    <FormContainer>
                        <label htmlFor="username">Atualizar nome</label>
                        <FormInput
                            type="text"
                            id="username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <FormButton onClick={handleNameChange}>Atualizar Nome</FormButton>
                    </FormContainer>
                    {message && <p>{message}</p>}
                </SubContainer>
    
                <SignOutButton onClick={() => logOut()}>Sair</SignOutButton>
            </Container>
        )
    } else {
        window.location.assign("/login")
    }
}

export default Profile;