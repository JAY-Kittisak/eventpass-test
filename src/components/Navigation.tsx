import React, { useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Switch } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'


import avatar from '../assets/avatar.svg'

interface Props { }

const Navigation: React.FC<Props> = () => {
    const [theme, setTheme] = useState('light-theme')
    const [checked, setChecked] = useState(false)

    // const location = useLocation()
    
    let activeClassName = "active-class";
    // useEffect(() => {
    //     if (isUserDropdownOpen) authDispatch(openUserDropdown(false))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location.pathname])
    const themeToggler = () => {
        if (theme === 'dark-theme') {
            setTheme('light-theme')
            setChecked(false)
        } else {
            setTheme('dark-theme')
            setChecked(true)
        }
    }
    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme])

    return (
        <NavigationStyled>
            <div>
                {/* {authUser && (
                    <div className='avatar'>
                        <img
                            src={userInfo?.imageUrl ? userInfo.imageUrl : avatar}
                            alt=""
                            onMouseOver={() =>
                                authDispatch(openUserDropdown(true))}
                        />
                        <AccountDropdown
                            name={authUser.displayName}
                            email={authUser.email}
                        />
                    </div>
                )} */}
            <div className='avatar'>
                <img
                    src={avatar}
                    alt=""
                />
            </div>
            
            <ul className="nav-items">
                    <li className="nav-item">
                        <NavLink 
                            to='/' 
                            className={({ isActive }) => isActive ? activeClassName : undefined}
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/manage-users' className={({ isActive }) => isActive ? activeClassName : undefined}>
                            Users
                        </NavLink>
                    </li>
                </ul>
            </div>
            
            <footer className='footer'>
                <Brightness4Icon />
                        <Switch
                            color='default'
                            value=''
                            checked={checked}
                            inputProps={{ 'aria-label': '' }}
                            size='medium'
                            onClick={themeToggler}
                        />
            </footer>
        </NavigationStyled>
    )
}

const NavigationStyled = styled.nav`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border-right: 1px solid var(--border-color);

    .admin-view {
        padding-top: 1rem;
        width: 100%;
        color: var(--primary-color);
        font-size: 1.5rem;
        font-weight: 600;
    }

    .avatar {
        width: 100%;
        border-bottom: 1px solid var(--border-color);
        text-align: center;
        padding: 1rem 0;
        
        img {
            height: 200px;
            width: 200px;
            object-fit: cover;
            border-radius: 50%;
            border: 8px solid var(--border-color);
            box-shadow: -0.3rem 5px 10px -7px rgba(0, 0, 0,0.8);
        }
    }
    .nav-items{
        margin-top: 30px;
        width: 100%;
        text-align: center;

        .sub-menu {
            padding-left: 20px;
            text-align: start;
            position: relative;
            
            svg {
                position: absolute;
            }
            
            span {
                padding-left: 30px;
            }
        }

        .active-class{
            background-color: var(--primary-color-light);
            color: var(--white-color);
        }
        li{
            display: block;
            a{
                display: block;
                padding: .45rem 0;
                position: relative;
                z-index: 10;
                text-transform: uppercase;
                transition: all .4s ease-in-out;
                font-weight: 600;
                letter-spacing: 1px;
                color: var(--white-color);
                &:hover{
                    cursor: pointer;
                }
                &::before{
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 50%;
                    background-color: var(--primary-color);
                    transition: All 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
                    opacity: 0.21;
                    z-index: -1;
                }
            }

            a:hover::before{
                width: 100%;
                height: 100%;
            }
        }
    }

    hr {
        margin: 1rem 2.5rem 0rem 2.5rem;
    }

    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid var(--border-color);
        width: 100%;
    }
`;

export default Navigation