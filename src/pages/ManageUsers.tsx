import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Title from '../components/Title'
import { MainLayout, InnerLayout } from '../styles/LayoutStyle'
import { ManageUser, UserInfo } from '../types'
import Loading from '../components/Loading'
import styled from 'styled-components'
import Pagination from '../components/Pagination'
import User from '../components/manage-users/User'
import { useDialog } from '../hooks/useDialog'
import ConfirmDelete from '../components/dialogs/ConfirmDelete'

interface Props { }

const baseURL = 'https://reqres.in/api/users'

const ManageUsers: React.FC<Props> = () => {
    const [users, setUsers] = useState<ManageUser | undefined>(undefined)
    const [deleteId, setDeleteId] = useState<UserInfo | undefined>(undefined)
    const [page, setPage] = useState(1)

    const { openDialog, setOpenDialog} = useDialog()

    useEffect(() => {
        axios.get(`${baseURL}?page=${page}`).then((response => {
            setUsers(response.data)
        }))
    }, [page])

    return (
        <MainLayout>
            <Title title={'Manage Users'} span={'Manage Users'} />
            {!users ? (
                <Loading height='60vh' />
            ) : (
                <InnerLayout>
                    <PaginationStyled>
                        <Pagination page={page} setPage={setPage} totalPages={users.total_pages}/>
                    </PaginationStyled>
                    <TableStyled>
                        <thead>
                            <tr>
                                <ThStyled width={'15%'} rowSpan={2}>Display</ThStyled>
                                <ThStyled width={'20%'} rowSpan={2}>Email</ThStyled>
                                <ThStyled width={'20%'} rowSpan={2}>First name</ThStyled>
                                <ThStyled width={'20%'} rowSpan={2}>Last name</ThStyled>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map(user => (
                                <User 
                                    key={user.id} 
                                    user={user} 
                                    setOpenDialog={setOpenDialog}
                                    setDeleteId={setDeleteId}
                                />
                            ))}
                        </tbody>
                    </TableStyled>
                    {openDialog && <ConfirmDelete userId={deleteId} setOpenDialog={setOpenDialog}/>}
                </InnerLayout>
            )}
        </MainLayout>
    )
}

const PaginationStyled = styled.div`
    display: flex;
    justify-content: end;
    background-color: var(--background-dark-color);
`

const TableStyled = styled.table`
    width: 100%;
    min-width: 1300px;
    border-spacing: 0;
    border-collapse: collapse;
    table-layout: fixed;
    margin-top: 1rem;
    text-align: center;
    background-color: var(--background-dark-color);
`

const ThStyled = styled.td`
    margin: 0;
    padding: 0.5rem;
    width: ${props => props.width};
    border: 0.2px solid #596275;
    word-wrap: break-word;
    font-weight: 600;
    font-size: 1.2rem;
`
export default ManageUsers