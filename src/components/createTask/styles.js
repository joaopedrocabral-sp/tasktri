import styled from "styled-components";

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

export const ModalContent = styled.div`
    background-color: ${props => props.theme.color.backgroundColor};
    color: ${props => props.theme.color.textColor};
    padding: 20px 40px;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1001;

    & h3{
        font-weight: 600;
    }

    & p{
        font-weight: 400;
    }
`

export const CancelButton = styled.button`
    padding: 4px 8px;
    border-radius: 20px;
    border: 2px solid ${props => props.theme.color.purple.primary};
    background-color: ${props => props.theme.color.backgroundColor};
`

export const ConfirmButton = styled.button`
    padding: 4px 8px;
    border-radius: 20px;
    border: 2px solid ${props => props.theme.color.purple.primary};
    background-color: ${props => props.theme.color.purple.primary};
    color: ${props => props.theme.color.white};
`

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
`

export const FormInput = styled.input`
    width: 100%;
    border-radius: 15px;
    padding: 5px 10px;
    border: 2px solid ${props => props.theme.color.purple.primary};
    -moz-appearance: none;
    appearance: none;
    font-size: 16px;
    font-weight: 400;
    height: 40px;
    margin-top: 5px;

    @media (max-width: 767px){
        font-size: 16px;
    }
`

export const FormSelect = styled.select`
    width: 100%;
    border-radius: 20px;
    padding: 5px 10px;
    border: 2px solid ${props => props.theme.color.purple.primary};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: 16px;
    font-weight: 400;
    height: 40px;
    margin-top: 5px;

    @media (max-width: 767px){
        font-size: 16px;
    }
`