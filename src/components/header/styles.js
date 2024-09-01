import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.color.white};
    background-color: ${props => props.theme.color.purple.primary};

    & img{
        width: 150px;
    }
`

export const ButtonModeToggler = styled.button`
    background-color: ${props => props.theme.color.backgroundColor};
    color: ${props => props.theme.color.textColorAlternative};
    padding: 6px 10px;
`

export const SignOutButton = styled.button`
    padding: 12px 18px;
    background-color: ${props => props.theme.color.purple.tertiary};
    color: ${props => props.theme.color.white};
`