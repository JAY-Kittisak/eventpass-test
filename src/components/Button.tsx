import React, { ButtonHTMLAttributes, forwardRef, Ref } from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@mui/material'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    height?: string
    width?: string
    loading?: boolean
}

const Button = forwardRef(
    (
        {
            children,
            disabled,
            style,
            className,
            height = '40px',
            width = '9rem',
            loading,
            ...props
        }: Props,
        ref: Ref<HTMLButtonElement>
    ) => {
        return (
            <ButtonStyled
                ref={ref}
                className={`btn ${className}`}
                disabled={disabled}
                style={{
                    cursor: loading || disabled ? 'not-allowed' : undefined,
                    height,
                    width,
                    ...style,
                }}
                {...props}
            >
                {loading ? (
                    <div className="center-spinner">
                        <CircularProgress color='inherit' size='20px'/>
                    </div>
                ) : (
                    children
                )}
            </ButtonStyled>
        )
    }
)

const ButtonStyled = styled.button`
    padding: auto 1rem;
    color: #313131;
    background-color: #ffc100;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.4s ease-in;
    font-size: 1.1rem;
    font-weight: 600;
    box-shadow: -0.3rem 5px 10px -7px rgba(0, 0, 0,0.8);

    &:hover {
        background-color: #c09001;
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

`
export default Button
