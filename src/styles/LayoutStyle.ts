import styled, { keyframes } from "styled-components"

export const MainLayout = styled.div`
    padding: 2rem 4rem;
    @media screen and (max-width: 1600px){
        padding: 3rem;
    }
    @media screen and (max-width: 900px){
        padding: 2rem 1.5rem;
    }
`
export const InnerLayout = styled.div`
    padding-top: 3rem;
`

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    z-index: 20;
`

const appear = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

export const DialogForm = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    background-color: var(--background-dark-color);
    border-radius: 2px;
    box-shadow: 0px 30px 20px rgba(0, 0, 0, 0.4);
    animation: ${appear} 0.4s linear;
    min-width: 360px;
    font-size: 1rem;
    z-index: 25;

    .modal-close {
        position: absolute;
        padding: 0px 8px;
        top: 0.5rem;
        right: 1rem;
        font-size: 1.6rem;
        color: #282c34;
        cursor: pointer;
        font-weight: bolder;
        width: 2rem;
        height: 2rem;
        border-radius: 50px;
        transition: all 0.3s ease-in-out;
    }

    .modal-close:hover {
        color: red;
        background-color: rgba(92, 101, 119, 0.3);
    }

    .header--center {
        margin: 1rem 0;
        font-size: 1.3rem;
        font-weight: 600;
        text-align: center;
        color: var(--primary-color);
    }

    .paragraph-footer {
        font-style: italic;
        color: grey;
        font-size: .8rem;
    }
    
    .paragraph-footer span {
        color: chocolate;
        cursor: pointer;
    }

    .grid-input{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 1rem;
        margin-bottom: .5rem;

        @media screen and (max-width: 900px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }
    
    button {
        margin: 1rem 0 .5rem;
    }
`

export const TextHead = styled.h4`
    color: var(--white-color);
    font-size: 1.4rem;
    margin: 16px 0;
    border-left: 5px solid #e74c3c;
    padding-left: 6px;
    letter-spacing: 2px;
`
export const TextErr = styled.p`
    color: red;
    font-size: .9rem;
    width: 360px;
    text-align: center;
`