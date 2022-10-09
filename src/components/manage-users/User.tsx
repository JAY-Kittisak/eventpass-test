import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { UserInfo } from '../../types'

interface Props {
    user: UserInfo
    setOpenDialog: (open: boolean) => void
    setDeleteId: (user: UserInfo | undefined) => void
}

const User: React.FC<Props> = ({
    user,
    setOpenDialog,
    setDeleteId
}) => {
    const navigate = useNavigate()
    const {
        id,
        email,
        first_name,
        last_name,
        avatar
    } = user

    return (
        <tr>
            <TdStyled width='15'>
                <ImageStyled>
                    <img src={avatar} alt="" />
                </ImageStyled>
            </TdStyled>
            <TdStyled width='20'>
                {email}
            </TdStyled>
            <TdStyled width='20'>
                {first_name}
            </TdStyled>
            <TdStyled width='20'>
                {last_name}
            </TdStyled>
            <TdStyled width='25'>
                <EditStyled>
                    <div className="icon btn-edit">
                        <div className='tooltip'>Edit</div>
                        <BorderColorIcon fontSize='large' onClick={() => navigate(`/manage-users/${id}`, { replace: true })} />
                    </div>
                    <div className="icon btn-delete">
                        <div className='tooltip'>Delete</div>
                        <DeleteForeverIcon
                            fontSize='large'
                            onClick={() => {
                                setDeleteId(user)
                                setOpenDialog(true)
                            }}
                        />
                    </div>
                </EditStyled>
            </TdStyled>
        </tr>
    )
}

const ImageStyled = styled.div`
    display: flex;
 	justify-content: center;
  	align-items: center;
    padding: 7px 20px;
    
    img {
        width: 65px;
        height: 65px;
        object-fit: cover;
        border-radius: 50%;
        transition: .4s;
    }
`

const TdStyled = styled.td`
    margin: 0;
    width: ${(props) => props.width + '%'};
    border: 0.2px solid #596275;
    word-wrap: break-word;
    text-align: center;
    font-size: 1rem;

    select { 
        background-color: var(--background-dark-color);
        color: var(--font-light-color);
    }
`

const EditStyled = styled.div`
    display: inline-flex;
    margin-top: 10px;
    
    .icon {
        position: relative;
        z-index: 2;
        margin: 0 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);
    }

    .icon svg {
        padding: 3px;
        display: block;
        border-radius: 7px;
        text-align: center;
    }
    
    .icon:hover svg {
        color: #fff;
    }

    .icon .tooltip {
        position: absolute;
        top: -30px;
        background-color: var(--background-dark-color);
        font-size: 20px;
        padding: 5px 18px;
        border-radius: 25px;
        box-shadow: 0 10px 10px rgba(0,0,0,0.1);
        opacity: 0;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);
        color: #fff;
    }

    .icon:hover .tooltip {
        opacity: 1;
        pointer-events: auto;
        top: -50px;
    }

    .icon .tooltip:before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        background-color: var(--background-dark-color);
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        transition: all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);
    }

    .icon:hover svg,
    .icon:hover .tooltip {
        text-shadow: 0px -1px 0px rgba(0,0,0,0.4);
    }

    .btn-edit:hover svg,
    .btn-edit:hover .tooltip,
    .btn-edit:hover .tooltip:before {
        background-color: #f3b805;
    }

    .btn-delete:hover svg,
    .btn-delete:hover .tooltip,
    .btn-delete:hover .tooltip:before {
        background-color: red;
    }
`

export default User