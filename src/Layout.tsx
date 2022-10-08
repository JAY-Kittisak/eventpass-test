import React, { useState, ReactNode } from 'react'
import styled from 'styled-components'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import Sidebar from './components/Sidebar';
import { useModalContext } from './state/modal-context'
import { useAlertContext } from './state/alert-context'
import { useAuthContext } from './state/auth-context'

interface Props {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    const [navToggle, setNavToggle] = useState(false)
    
    const { authState } = useAuthContext()
    const { modal } = useModalContext()
    const { alertState } = useAlertContext()

    const isToken = authState.token !== undefined

    return (
        <div>
            {isToken && (
                <>
                    <Sidebar navToggle={navToggle} />
                    <div className='ham-burger-menu'>
                        <IconButton onClick={() => setNavToggle(!navToggle)}>
                            <MenuIcon />
                        </IconButton>   
                    </div>
                </>
            )}
                    
            <MainContentStyled isUser={isToken}>
                <div className='lines'>
                    <div className='line-1'></div>
                    <div className='line-2'></div>
                    <div className='line-3'></div>
                    <div className='line-4'></div>
                </div>
                {alertState && alertState}
                {children}
                

                {modal && modal}
            </MainContentStyled>
        </div>
    )
}

const MainContentStyled = styled.main<{ isUser: boolean }>`
    position: relative;
    min-height: 100vh;
    margin-left: ${props => props.isUser ? '16.3rem' : '0'};
  
    @media screen and (max-width: 1400px){
        margin-left: 0;
    }
  
    .lines {
        position: absolute;
        min-height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        opacity: 0.4;
        z-index: -1;
        .line-1,
        .line-2,
        .line-3,
        .line-4 {
            width: 1px;
            min-height: 100vh;
            background-color: var(--border-color);
        }
    }
`;

export default Layout