import { createGlobalStyle } from "styled-components";

const MyGlobalStyles = createGlobalStyle`

html{
        scroll-behavior: smooth;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        gap: 20px;
        font-family: "Poppins";
        color: ${props => props.theme.color.textColor};
        text-align: center;
        transition: all .3s;
    }
    body{
        background-color: ${props => props.theme.color.backgroundColor};
        margin: 0 auto;
    }
    .header-boxed{
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
        padding: 22px 15px;
    }
    .section-boxed{
        max-width: 1300px;
        margin: 0 auto;
        padding: 50px 15px;
    }
    .section-boxed-thin{
        max-width: 1300px;
        margin: 0 auto;
        padding: 50px 15px;
    }
    .flex-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .row-flex-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .header-flex-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .grid-container-3{
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: auto;
        justify-items: center;
        align-items: center;
        
    }
    .w-100{
        width: 100%;
    }
    .w-90{
        width: 90%;
    }
    .w-80{
        width: 80%;
    }
    .w-70{
        width: 70%;
    }
    .w-65{
        width: 65%;
    }
    .w-60{
        width: 60%;
    }
    .w-50{
        width: 50%;
    }
    .w-40{
        width: 40%;
    }
    .w-30{
        width: 30%;
    }
    .w-20{
        width: 20%;
    }
    .w-10{
        width: 10%;
    }
    .gap-0{
        gap: 0;
    }
    .gap-10{
        gap: 10px;
    }
    .gap-50{
        gap: 50px;
    }
    .m-0{
        margin: 0;
    }
    .mb-0{
        margin-bottom: 0;
    }
    .mb-10{
        margin-bottom: 10px;
    }
    .mb-20{
        margin-bottom: 20px;
    }
    .mb-30{
        margin-bottom: 30px;
    }
    .h100{
        height: 100%;
    }
    .color-w{
        color: ${props => props.theme.color.white};
    }
    .color-r{
        color: ${props => props.theme.color.red.primary};
    }
    .color-g{
        color: ${props => props.theme.color.green.primary};
    }
    h1{
        font-family: "Montserrat";
        font-size: 26px;
        font-weight: 900;
        ${'' /* text-transform: uppercase; */}
    }
    h2{
        font-family: "Montserrat";
        font-size: 40px;
        font-weight: 900;
        margin-bottom: 15px;
        text-transform: uppercase;
    }
    h3{
        font-family: "Poppins";
        font-size: 24px;
        font-weight: 700;
    }
    p{  
        font-family: "Poppins";
        font-size: 18px;
        font-weight: 500;
    }
    button{
        border: none;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: 700;
        border-radius: 100px;
    }
    a{
        text-decoration: none;
    }
    li{
        list-style-type: none
    }
    input{
        font-size: 16px;
    }
    @media (max-width: 767px){
        .header-boxed{
            padding: 20px;
        }
        .header-flex-container{
            flex-direction: row;
            gap: 10px;
        }
        .header-flex-container-2{
            justify-content: space-between !important;
        }
        .section-boxed{
            padding: 30px 20px;
        }
        .section-boxed-thin{
            padding: 30px 20px;
        }
        .flex-children-60{
        width: 100%;
        }
        .grid-container-3{
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        h1{
            font-size: 20px;
        }
        h2{
            font-size: 28px;
            margin-bottom: 20px;
        }
        h3{
            font-size: 18px;
        }
        p{  
            font-size: 16px;
        }
        .w-80{
            width: 90%;
        }
        .w-65, .w-60{
            width: 100%;
        }
        .mobile-hidden{
            display: none;
        }
    }

`

export default MyGlobalStyles;