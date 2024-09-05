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
    padding: 6px 8px;
`

export const ProfileButton = styled.div`
    & svg{
        width: 30px;
        height: 30px;
        fill: ${props => props.theme.color.white};
    }
`

export const ListButton = styled.div`
    & svg{
        width: 26px;
        height: 26px;
        fill: ${props => props.theme.color.white};
    }
`