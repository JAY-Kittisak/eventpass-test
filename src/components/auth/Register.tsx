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

const Register: React.FC<Props> = () => {
    const { setModalType } = useModalContext()
    const { authDispatch } = useAuthContext()
    const navigate = useNavigate()
    const { handleSubmit, control, formState: { errors } } = useForm<LoginData>({
        resolver: yupResolver(schema)
    })
    
    const {
        register,
        loading,
        error
    } = useAuthenticate()

    const handleRegister: SubmitHandler<LoginData> = (async (data) => {
        const response = await register(data)

        if (response) {
            authDispatch(response)
            setModalType('close')
            navigate(`/manage-users/${response.id}`, { replace: true })
        }
    })

    return (
        <>
            <Backdrop onClick={() => setModalType('close')}></Backdrop>
            <DialogForm>
                <div 
                    className="modal-close" 
                    onClick={() => setModalType('close')}
                >
                    &times;
                </div>

                <h3 className="header--center">
                    Register
                </h3>
                
                <form onSubmit={handleSubmit(handleRegister)}>
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
                    <br />
                    <Button
                        loading={loading}
                        width='100%' 
                        type="submit"
                    >
                        Submit
                    </Button>

                    {error && <TextErr>{error}</TextErr>}

                </form>

                <p className='paragraph-footer'>Already have an account? 
                    <span onClick={() => setModalType('login')}> Login</span> instead.</p>
            </DialogForm>
        </>
    )
}

export default Register