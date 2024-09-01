import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import LogIn from "./pages/logIn";
import Register from "./pages/register";
import Profile from "./pages/profile";

function AppRoutes({theme, themeToggler}){
    return(
        <BrowserRouter>
        <Header theme={theme} themeToggler={themeToggler} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;