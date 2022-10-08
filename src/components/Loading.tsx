import React from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@mui/material'

interface Props {
    height: string
}

const Loading: React.FC<Props> = ({ height }) => {
    return (
        <Content height={height}>
            <div>
                <CircularProgress color='inherit'/>
                <p>Loading...</p>
            </div>
        </Content>
    )
}

const Content = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${props => props.height};

    div {
        text-align: center;
    }

    div p {
        padding-left: 1rem;
        font-size: 2rem;
    }
`

export default Loading