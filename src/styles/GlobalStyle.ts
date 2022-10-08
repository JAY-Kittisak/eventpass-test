import { createGlobalStyle } from 'styled-components'

const GlobalStyled = createGlobalStyle`
    :root {
        --primary-color: #007bff;
        --primary-color-light: #057FFF;
        --background-dark-color: rgb(245,245,245);
        --background-dark-grey: #e4e4e4;
        --background-light-color-2: rgba(3,127,255,.3);
        --border-color: #cbced8;
        --font-light-color: #313131;
        --sidebar-dark-color: #e4e4e4;
        --scrollbar-bg-color: #383838;
        --scrollbar-thump-color: #6b6b6b;
        --scrollbar-track-color: #383838;
    }

    .light-theme {
        --primary-color: #007bff;
        --primary-color-light: #057FFF;
        --background-dark-color: rgb(245,245,245);
        --background-dark-grey: #e4e4e4;
        --background-light-color-2: rgba(3,127,255,.3);
        --border-color: #cbced8;
        --font-light-color: #313131;
        --sidebar-dark-color: #e4e4e4;
        --scrollbar-bg-color: #383838;
        --scrollbar-thump-color: #6b6b6b;
        --scrollbar-track-color: #383838;
    }

    .dark-theme {
        --primary-color: #007bff;
        --primary-color-light: #057FFF;
        --background-dark-color: rgb(24,24,24);
        --background-dark-grey: rgb(32,32,32);
        --background-light-color-2: rgba(3,127,255,.3);
        --border-color: rgb(45,45,45);
        --font-light-color: rgb(210,210,210);
        --sidebar-dark-color: rgb(32,32,32);
        --scrollbar-bg-color: #383838;
        --scrollbar-thump-color: #6b6b6b;
        --scrollbar-track-color: #383838;
    }

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        font-family: 'Nunito', sans-serif;
        font-size: 1rem;
    }

    body{
        background-color: var(--background-dark-color);
        color: var(--font-light-color);
    }

    body::-webkit-scrollbar{
        width: 9px;
        background-color: var(--scrollbar-bg-color);
    }
    body::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: var(--scrollbar-thump-color);
    }
    body::-webkit-scrollbar-track{
        border-radius: 10px;
        background-color: var(--scrollbar-track-color);
    }
    
    .ham-burger-menu{
        position: absolute;
        right: 5%;
        top: 3%;
        display: none;
        z-index: 15;
        svg{
            color: var(--primary-color);
            font-size: 3rem;
        }
    }

    .nav-toggle{
        transform: translateX(0%);
        z-index: 20;
    }

    @media screen and (max-width: 1400px){
        .ham-burger-menu{
            display: block;
        }
        .table-ipad--hide {
            display: none;
        }
    }

    @media screen and (max-width: 900px) {
        .table-phone--hide {
            display: none;
        }
    }

    .truncated {
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
    }

`
export default GlobalStyled