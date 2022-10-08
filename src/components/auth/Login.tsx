import React from 'react'
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { TextField } from '@mui/material'

import Button from '../Button'
import { useModalContext } from '../../state/modal-context'
import { useAuthContext } from '../../state/auth-context';
import { useAuthenticate } from '../../hooks/useAuthenticate';
import { LoginData } from '../../types';
import { Backdrop, DialogForm, TextErr } from '../../styles/LayoutStyle'

interface Props { }

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
})

const Login: React.FC<Props> = () => {
    const { setModalType } = useModalContext()
    const { authDispatch } = useAuthContext()
    const navigate = useNavigate()
    const { handleSubmit, control, formState: { errors } } = useForm<LoginData>({
        resolver: yupResolver(schema)
    })
    
    const {
        login,
        loading, 
        error
    } = useAuthenticate()

    const handleLogin: SubmitHandler<LoginData> = (async (data) => {
        const response = await login(data)

        if (response) {
            authDispatch(response)
            setModalType('close')
        }
    })

    return (
        <>
            <Backdrop
                onClick={() => {
                    navigate('/', { replace: true })
                    setModalType('close')
                }}
            ></Backdrop>
            <DialogForm>
                <div
                    className="modal-close"
                    onClick={() => {
                        navigate('/', { replace: true })
                        setModalType('close')
                    }}
                >
                    &times;
                </div>

                <h3 className="header--center">
                    Login
                </h3>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <Controller
                        name='email'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type='email'
                                label='Email'
                                variant='standard'
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                        )}
                    />
                    <br />
                    <Controller
                        name='password'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type='password'
                                label='password'
                                variant='standard'
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                            />
                        )}
                    />

                    <Button
                        loading={loading}
                        width='100%'
                    >
                        Submit
                    </Button>
                    {error && <TextErr>{error}</TextErr>}
                </form>

                <p className='paragraph-footer'>
                    Don't have an account yet?&nbsp;
                    <span onClick={() => setModalType('register')}>
                        Register
                    </span>
                    &nbsp;instead.
                </p>
            </DialogForm>
        </>
    )
}

export default Login