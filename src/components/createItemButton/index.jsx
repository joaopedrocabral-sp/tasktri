import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "./styles";

function CreateItemButton({ onClick }) {
    return (
        <Button onClick={onClick}>
            <FaCirclePlus />
        </Button>
    );
}

export default CreateItemButton;