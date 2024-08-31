import { HeaderContainer, ButtonModeToggler } from "./styles";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import task3logo from "../../assets/TASK-3-LOGO.PNG";
import { useState, useEffect } from "react";
import { verifyLogin, logOut } from "../../hooks/auth";



function Header({ theme, themeToggler }) {

    const [userLogged, setUserLogged] = useState(null);
    useEffect(() => {
        verifyLogin(setUserLogged);
    }, []);

    if (userLogged === null || userLogged === "") {
        return (
            <HeaderContainer>
                <div className="header-boxed header-flex-container">
                    <img src={task3logo} alt="" />
                    <ButtonModeToggler className="modeToggler" onClick={themeToggler}>
                        {theme == "light" ? (
                            <MdOutlineDarkMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                        ) : (
                            <MdOutlineLightMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                        )}
                    </ButtonModeToggler>
                </div>
            </HeaderContainer>
        )
    } else if (userLogged) {
        return (
            <HeaderContainer>
                <div className="header-boxed header-flex-container">
                    <img src={task3logo} alt="" />
                    <div>
                        <ButtonModeToggler className="modeToggler" onClick={themeToggler}>
                            {theme == "light" ? (
                                <MdOutlineDarkMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                            ) : (
                                <MdOutlineLightMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                            )}
                        </ButtonModeToggler>
                        <button className="mobile-hidden" onClick={() => logOut()}>
                            Sair
                        </button>
                    </div>
                </div>
            </HeaderContainer>
        )
    }
}

export default Header;