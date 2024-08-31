import { FormContainer, FormInput, FormButton } from "./styles";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { verifyLogin } from "../../hooks/auth";
import { register } from "../../hooks/auth";

function Register() {
    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        verifyLogin(setUserLogged);
    }, [])

    const [emailInput, setEmailInput] = useState("")
    const [passInput, setPassInput] = useState("")

    function loginHandler(e) {
        e.preventDefault()
        register(emailInput, passInput)
    }

    if (userLogged === null) {
        return <div>Carregando...</div>
    }

    if (userLogged) {
        window.location.assign("/")
    }

    else if (userLogged === "") {
        return (
            <div className="section-boxed-thin flex-container">
                <FormContainer onSubmit={loginHandler}>
                    <h2>Registre-se</h2>
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
                </FormContainer>
            </div>
        )
    }
}


export default Register;