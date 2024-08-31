import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "./styles";

function CreateTaskButton({onClick}) {
    return (
        <Button onClick={onClick}>
            <FaCirclePlus />
        </Button>
    )
}

export default CreateTaskButton;