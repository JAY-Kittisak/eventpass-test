import React from 'react'
import axios from 'axios'
import { Button, CircularProgress } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { useAsyncCall } from '../../hooks/useAsyncCall'
import { useAlertContext } from '../../state/alert-context'
import { Backdrop, DialogForm, TextErr } from '../../styles/LayoutStyle'
import { UserInfo } from '../../types'
import styled from 'styled-components';

interface Props {
    userId?: UserInfo
    setOpenDialog: (open: boolean) => void
}

const ConfirmDelete: React.FC<Props> = ({ userId, setOpenDialog }) => {
    const { setAlertType } = useAlertContext()
    const { loading, setLoading, error, setError } = useAsyncCall()

    const handleUser = (async () => {
        try {
            if (!userId) return
            setLoading(true)

            const response = await axios.delete(`https://reqres.in/api/users/${userId.id}`)

            if (response.status === 204) {
                setLoading(false)
                setOpenDialog(false)
                setAlertType('success')
            }
        } catch (err) {
            const { message } = err as { message: string }
            setError(message)
            setLoading(false)
        }
    })

    return (
        <>
            <Backdrop onClick={() => setOpenDialog(false)}></Backdrop>
            <DialogForm>
                <div
                    className='modal-close'
                    onClick={() => {
                        setOpenDialog(false)
                    }}
                >
                    &times;
                </div>

                <DeleteStyled>
                    <WarningAmberIcon fontSize='large' color='warning' />
                    <h3>
                        Delete User?
                    </h3>
                    <p className='paragraph'>Are you sure you want to</p> 
                    <p className='paragraph'>delete user <span>{userId?.first_name}  {userId?.last_name}</span></p>

                    {error && <TextErr>{error}</TextErr>}

                    <div className='flex-button'>
                        <Button
                            color='inherit'
                            variant="outlined"
                            onClick={() => {
                                setOpenDialog(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUser}
                            variant="contained"
                            color='error'
                        >
                            {loading ? (
                                <div className="center-spinner">
                                    <CircularProgress color='inherit' size='22px' />
                                </div>
                            ) : (
                                <p className='paragraph-delete'>Delete</p>
                            )}
                        </Button>
                    </div>
                </DeleteStyled>
            </DialogForm>
        </>
    )
}

const DeleteStyled = styled.div`
    text-align: center;

    h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: .5rem;
    }

    .paragraph {
        letter-spacing: 1px;
        font-size: 1.2rem;
    }

    .paragraph span {
        color: red;
        font-size: 1.2rem;
        font-weight: 600;
    }

    .flex-button {
        display: flex;
        justify-content: space-between;

        .paragraph-delete {
            font-size: .9rem;
        }

        .center-spinner {
            display: flex;
            justify-content: center;
        }

        .center-spinner p {
            font-size: 1.2rem;
            font-weight: 600;
        }

        .center-spinner span {
            font-size: .9rem;
        }

        button {
            width: 100px;
        }

        button + button {
            margin-left: 1.5rem;
        }
    }
`
export default ConfirmDelete