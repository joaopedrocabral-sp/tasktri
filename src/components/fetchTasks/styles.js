import styled from "styled-components";

export const DateTasksTitle = styled.h2`
    font-size: 30px;

    & span{
        color: ${props => props.theme.color.white};
        background-color: ${props => props.theme.color.purple.primary};
        padding: 3px 6px;
        border-radius: 10px;
    }
`

export const TasksContainer = styled.div`
    width: 100%;
    border-radius: 20px;
    border: 2px solid ${props => props.theme.color.purple.primary};
    min-height: 100px;

    & h3{
        background-color: ${props => props.theme.color.purple.primary};
        border-radius: 15px 15px 0 0;
        color: ${props => props.theme.color.white};
        padding: 5px 25px;
        text-align: left;
    }

    & ul{
        padding: 5px 25px;

        & li{
            text-align: left;
        }
    }
`