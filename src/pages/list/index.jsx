import { useEffect, useState } from "react";
import { verifyLogin } from "../../hooks/auth";
import CreateItemButton from "../../components/createItemButton";
import CreateItem from "../../components/createItem";
import FetchItems from "../../components/fetchItems";

function ListPage() {
    const [userLogged, setUserLogged] = useState(null);
    const [showCreateItem, setShowCreateItem] = useState(false);

    const handleClick = () => {
        setShowCreateItem(!showCreateItem);
    };

    const closeCreateItemModal = () => {
        setShowCreateItem(false);
    };

    useEffect(() => {
        verifyLogin(setUserLogged);
    }, []);

    if (userLogged === null) {
        return <div>Carregando...</div>;
    }

    if (userLogged) {
        return (
            <div className="section-boxed flex-container">
                <CreateItemButton onClick={handleClick} />
                {showCreateItem && <CreateItem onClose={closeCreateItemModal} />}
                <FetchItems />
            </div>
        );
    } else {
        window.location.assign("/login");
    }
}

export default ListPage;