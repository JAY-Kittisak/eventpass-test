import React from 'react'
import { MainLayout, InnerLayout } from '../styles/LayoutStyle'

import styled from 'styled-components'
import ButtonModal from '../components/ButtonModal'
import { useAuthContext } from '../state/auth-context'
import Button from '../components/Button'
import Title from '../components/Title'

interface Props { }

const HomePage: React.FC<Props> = () => {
    const { authState, authDispatch } = useAuthContext()
    const isToken = authState.token === undefined

    return (
        <MainLayout>
            <HomePageStyled>
                    {isToken ? (
                        <div className="typography">
                            <h2>Test From</h2>
                            <h1>EventPass</h1>
                            <ButtonModal />
                        </div>
                    ) : (
                        <InnerLayout>
                            <Title title='HomePage' span='HomePage'/>
                            <div className="typography">
                                <Button
                                    width='200px'
                                    onClick={() => authDispatch({token: undefined})}
                                >
                                    Log out
                                </Button>
                            </div>
                        </InnerLayout>
                    )}
            </HomePageStyled>
        </MainLayout>
    )
}

const HomePageStyled = styled.header`
    width: 100%;

    .typography {
        padding: 0 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 80%;

        h1 {
            font-size: 5rem;
        }
        h2 {
            font-size: 4rem;
        }
    }
`;
export default HomePage