import styled from "styled-components";

export const Container = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
`

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

    & div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 10px 25px;
    }

    & h3{
        background-color: ${props => props.theme.color.purple.primary};
        border-radius: 15px 15px 0 0;
        color: ${props => props.theme.color.white};
        padding: 5px 25px;
        text-align: left;
    }

    & ul{

        & li{
            text-align: left;
            line-height: 30px;
        }
    }

    & input{
        all: unset;
        border: 2px solid ${props => props.theme.color.purple.primary};
        width: 15px;
        height: 15px;
        display: inline-block;
        border-radius: 5px;
        margin-bottom: -4px;
        margin-right: 5px;
    }

    & input:checked{
        background-color: ${props => props.theme.color.purple.primary};
        width: 15px;
        height: 15px;
    }
`