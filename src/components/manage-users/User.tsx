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
                    <BorderColorIcon fontSize='large' onClick={() => navigate(`/manage-users/${id}`, { replace: true })}/>
                    <DeleteForeverIcon 
                        fontSize='large' 
                        onClick={() => {
                            setDeleteId(user)
                            setOpenDialog(true)
                        }}
                    />
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
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        padding: 3px;
        cursor: pointer;
        color: white;
        border-radius: 5px;
        box-shadow: 5px 3px 3px rgba(0, 0, 0, .5);
        transition: all 0.3s ease 0s;
    }
    
    svg:hover {
        transform: translateY(-3px);
    }
    
    svg:nth-child(1) {
        margin-right: 1.5rem;
        background-color: #FFC107;
    }

    svg:nth-child(2) {
        margin-left: 1.5rem;
        background-color: red;
    }
`

export default User