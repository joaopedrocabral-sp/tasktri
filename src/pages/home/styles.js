import styled from "styled-components";

export const DateInput = styled.input`
    padding: 3px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    border: 2px solid ${props => props.theme.color.purple.primary};
    background-color: ${props => props.theme.color.purple.primary};
    color: ${props => props.theme.color.white};

    @media (max-width: 767px){
        font-size: 14px;
    }
`