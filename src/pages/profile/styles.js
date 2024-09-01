import styled from "styled-components"

export const Container = styled.div`
    display:  flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 85vh;

    & h2{
        color: ${props => props.theme.color.textColorAlternative};
    }

    & p{
        font-size: 26px;
        font-weight: 700;

        & span{
            color: ${props => props.theme.color.purple.primary};
        }
    }
`

export const SubContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    margin-top: 20px;

    & a{
        margin-top: -10px;
        font-size: 14px;
    }
`

export const FormInput = styled.input`
    width: 100%;
    border-radius: 20px;
    padding: 10px 20px;
    border: 2px solid ${props => props.theme.color.purple.primary};
    background-color: ${props => props.theme.color.backgroundColor};
    color: ${props => props.theme.color.textColor};
`

export const FormButton = styled.button`
    width: 100%;
    background-color: ${props => props.theme.color.purple.primary};
    padding: 10px 20px;
    color: ${props => props.theme.color.white};
    font-size: 16px;
`

export const SignOutButton = styled.button`
    width: 100%;
    max-width: 400px;
    border: 2px solid ${props => props.theme.color.purple.primary};
    background-color: ${props => props.theme.color.backgroundColor};
    padding: 10px 20px;
    font-size: 16px;
`