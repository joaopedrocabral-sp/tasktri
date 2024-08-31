import styled from "styled-components";

export const Button = styled.button`
    position: absolute;
    bottom: 30px;
    right: 30px;
    background-color: ${props => props.theme.color.transparent};

    & svg{
        width: 50px;
        height: 50px;
    }
`