import { HeaderContainer, ButtonModeToggler, ProfileButton, ListButton } from "./styles";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import task3logo from "../../assets/task3logo.png";
import { useState, useEffect } from "react";
import { verifyLogin } from "../../hooks/auth";
import { Link, useLocation } from "react-router-dom";

function Header({ theme, themeToggler }) {
    const [userLogged, setUserLogged] = useState(null);
    const location = useLocation(); // Hook para verificar a rota atual

    useEffect(() => {
        verifyLogin(setUserLogged);
    }, []);

    // Verifique a rota atual e defina qual ícone mostrar
    const isHomePage = location.pathname === "/";
    const isListPage = location.pathname === "/list";

    if (userLogged === null || userLogged === "") {
        return (
            <HeaderContainer>
                <div className="header-boxed header-flex-container">
                    <Link to="/"><img src={task3logo} alt="" /></Link>
                    <ButtonModeToggler className="modeToggler" onClick={themeToggler}>
                        {theme === "light" ? (
                            <MdOutlineDarkMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                        ) : (
                            <MdOutlineLightMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                        )}
                    </ButtonModeToggler>
                </div>
            </HeaderContainer>
        );
    } else if (userLogged) {
        return (
            <HeaderContainer>
                <div className="header-boxed header-flex-container">
                    <Link to="/"><img src={task3logo} alt="" /></Link>
                    <div className="row-flex-container">
                        <ListButton>
                            <Link to={isHomePage ? "/list" : "/"}>
                                {isHomePage ? (
                                    <FaClipboardList />
                                ) : isListPage ? (
                                    <FaCalendarAlt />
                                ) : (
                                    <FaClipboardList />
                                )}
                            </Link>
                        </ListButton>
                        <ProfileButton>
                            <Link to="/profile">
                                <IoMdPerson />
                            </Link>
                        </ProfileButton>
                        <ButtonModeToggler className="modeToggler" onClick={themeToggler}>
                            {theme === "light" ? (
                                <MdOutlineDarkMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                            ) : (
                                <MdOutlineLightMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                            )}
                        </ButtonModeToggler>
                    </div>
                </div>
            </HeaderContainer>
        );
    }
}

export default Header;