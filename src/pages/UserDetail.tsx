import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'
import AddPhotoAlternate from '@mui/icons-material/PhotoLibrary';
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

import { useAlertContext } from '../state/alert-context';
import { UserInfo } from '../types'
import Title from '../components/Title';
import Loading from '../components/Loading';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAsyncCall } from '../hooks/useAsyncCall';
import { 
    InnerLayout,
    MainLayout,
    TextHead,
    TextErr
} from '../styles/LayoutStyle';

interface Props { }

type UpdateUser = {
    name: string
    job: string
    updatedAt?: string
}

type FormUser = Pick<
    UpdateUser,
    | 'name'
    | 'job'
>

const schema = yup.object().shape({
    name: yup.string().required(),
    job: yup.string().required()
})

const baseURL = 'https://reqres.in/api/users'

const UserDetail: React.FC<Props> = () => {
    const [userQuery, setUserQuery] = useState<UserInfo | undefined>(undefined)
    const [updateUser, setUpdateUser] = useState<UpdateUser | undefined>(undefined)
    const { loading, setLoading, error, setError } = useAsyncCall()

    const { id } = useParams()

    const { setAlertType } = useAlertContext()
    
    const { handleSubmit, control, formState: { errors } } = useForm<FormUser>({
        resolver: yupResolver(schema)
    })

    const handleUser: SubmitHandler<FormUser> = (async (data) => {
        try {
            if (!id) return
            setLoading(true)

            const response = await axios.put(`${baseURL}/${id}`,data)
    
            if (response.status === 200) {
                setUpdateUser(response.data)
                setLoading(false)
                setAlertType('success')
            } 
        } catch (err) {
            const { message } = err as { message: string }
            setError(message)
            setLoading(false)
        }
    })

    useEffect(() => {
        if (!id) return

        axios.get(`${baseURL}/${id}`).then((response => {
            setUserQuery(response.data.data)
        }))
    }, [id])
    
    return (
         <MainLayout>
            <Title title={'User detail'} span={'User detail'} />
                {!userQuery ? (
                    <Loading height='60vh' />
                ) : (
                    <InnerLayout>
                        <TextHead>Edit User</TextHead>
                        <UserStyled>
                            <section className='user-upload'>
                                <img
                                    src={userQuery.avatar}
                                    alt="avatar"
                                />
                                <div className='round'>
                                    <input type="file" disabled/>
                                    <AddPhotoAlternate/>
                                </div>
                            </section>
                            
                            <div className='user-content'>
                            {!updateUser ? (
                                <>
                                    <p>Name : {userQuery.first_name} {userQuery.last_name}</p>
                                    <p>Email : {userQuery.email}</p>
                                </>
                            ) : (
                                <>
                                    <p>Name : {updateUser.name}</p>
                                    <p>Email : {userQuery.email}</p>
                                    <p>Updated At : {updateUser.updatedAt?.slice(0,10)}</p>
                                </>
                            )}
                            </div>

                    <form onSubmit={handleSubmit(handleUser)}>
                        <div className='flex-dept'>
                            <Controller
                                name='name'
                                control={control}
                                defaultValue={''}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label='Name'
                                        placeholder='new name'
                                        error={errors?.name?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='job'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label='Job'
                                        placeholder='your job'
                                        error={errors?.job?.message}
                                    />
                                )}
                            />
                        </div>

                        <Button
                            type='submit'
                            width='100%'
                            loading={loading}
                            disabled={loading}
                            style={{ margin: '0.5rem 0' }}
                        >
                            Save
                        </Button>
                    </form>
                    {error && <TextErr>{error}</TextErr>}
                        </UserStyled>
                    </InnerLayout>
                    )}
        </MainLayout>
    )
}

const UserStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .flex-dept{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 1rem;
        margin-bottom: .5rem;
        
        @media screen and (max-width: 1200px) and (min-width: 980px) {
            grid-template-columns: repeat(1, 1fr);
        }
        @media screen and (max-width: 750px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    .user-content {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p:nth-child(1) {
            font-size: 1.2rem;
        }
    }

    form {
        width: 700px;
        background-color: var(--background-dark-color);

        @media screen and (max-width: 750px) {
            width: 400px;
        }
    }

    .user-upload {
        position: relative;
        margin: auto;
    }
    
    .user-upload img{
        width: 250px;
        height: 250px;
        object-fit: cover;
        border-radius: 50%;
        border: 8px solid var(--border-color);
        box-shadow: -0.3rem 5px 10px -7px rgba(0, 0, 0,0.8);
    }

    .user-upload .round {
        position: absolute;
        bottom: 0;
        right: 40px;
        width: 50px;
        height: 50px;
        background-color: #ffc100;
        color: #313131;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: -0.3rem 5px 10px -7px rgba(0, 0, 0,0.8);
    }

    .user-upload .round:hover {
        background-color: #c09001;
    }

    .user-upload .round svg {
        margin: 4px;
        font-size: 2.6rem;
    }

    .user-upload .round input[type='file'] {
        position: absolute;
        transform: scale(2);
        opacity: 0;
    }

    .user-upload p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: red;
    }

    input[type='file']::-webkit-file-upload-button {
        cursor: pointer;
    }
`

export default UserDetail