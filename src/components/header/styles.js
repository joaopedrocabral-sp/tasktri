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

export const ProfileButton = styled.div`
    & svg{
        width: 30px;
        height: 30px;
        margin-bottom: -8px;
        fill: ${props => props.theme.color.white};
    }
`