import { HeaderContainer, ButtonModeToggler, ProfileButton } from "./styles";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import task3logo from "../../assets/task3logo.png"
import { useState, useEffect } from "react";
import { verifyLogin } from "../../hooks/auth";
import { Link } from "react-router-dom";

function Header({ theme, themeToggler }) {

    const [userLogged, setUserLogged] = useState(null)
    useEffect(() => {
        verifyLogin(setUserLogged)
    }, []);

    if (userLogged === null || userLogged === "") {
        return (
            <HeaderContainer>
                <div className="header-boxed header-flex-container">
                    <Link to="/"><img src={task3logo} alt="" /></Link>
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
                    <Link to="/"><img src={task3logo} alt="" /></Link>
                    <div className="row-flex-container">
                        <ButtonModeToggler className="modeToggler" onClick={themeToggler}>
                            {theme == "light" ? (
                                <MdOutlineDarkMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                            ) : (
                                <MdOutlineLightMode style={{ fontSize: "30px", marginBottom: "-4px" }} />
                            )}
                        </ButtonModeToggler>
                        <ProfileButton>
                            <Link to="/profile">
                                <IoMdPerson />
                            </Link>
                        </ProfileButton>
                    </div>
                </div>
            </HeaderContainer>
        )
    }
}

export default Header;