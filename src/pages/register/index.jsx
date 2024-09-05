import { FormContainer, FormInput, FormButton } from "./styles";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { verifyLogin } from "../../hooks/auth";
import { register } from "../../hooks/auth";

function Register() {
    const [userLogged, setUserLogged] = useState(null);
    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [loading, setLoading] = useState(false); // Adicionado estado de loading
    const [error, setError] = useState(""); // Adicionado estado para mensagens de erro

    useEffect(() => {
        verifyLogin(setUserLogged);
    }, []);

    async function registerHandler(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await register(emailInput, passInput, nameInput);
            window.location.assign("/");
        } catch (err) {
            setError("Erro ao registrar: " + err.message);
            setLoading(false);
        }
    }

    if (userLogged === null || loading) {
        return <div>Carregando...</div>;
    }

    if (userLogged) {
        window.location.assign("/");
    } else {
        return (
            <div className="section-boxed-thin flex-container">
                <FormContainer onSubmit={registerHandler}>
                    <h2>Registre-se</h2>
                    <FormInput
                        type="text"
                        id="name"
                        placeholder="Nome"
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                    />
                    <FormInput
                        type="text"
                        id="email"
                        placeholder="E-Mail"
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                    />
                    <FormInput
                        type="password"
                        id="password"
                        placeholder="Senha"
                        value={passInput}
                        onChange={e => setPassInput(e.target.value)}
                    />
                    <FormButton type="submit">Registrar</FormButton>
                    <Link to="/login">Faça login</Link>
                    {error && <p>{error}</p>} {/* Exibir mensagem de erro, se houver */}
                </FormContainer>
            </div>
        );
    }
}

export default Register;