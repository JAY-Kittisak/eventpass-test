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
                            <h1>Test From EventPass</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eos dolorum quis sit repellat, numquam nemo tenetur natus iure cupiditate, temporibus mollitia adipisci iusto aperiam ab reprehenderit voluptates
                            </p>
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
    .typography {
        padding: 0 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 600px;

        @media screen and (max-width: 900px) {
            width: 80%;
        }

        h1 {
            font-size: 2.5rem;
        }
    }
`;
export default HomePage