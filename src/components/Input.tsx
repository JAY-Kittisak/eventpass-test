import { InputHTMLAttributes, forwardRef, Ref } from 'react'
import styled from 'styled-components'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Input = forwardRef(
    (
        { label, error , type = 'text', ...props }: Props,
        ref: Ref<HTMLInputElement>
    ) => {
        return (
            <InputStyled>
                <label htmlFor={label}>
                    {label}
                </label>
                <input id={label} type={type} {...props} ref={ref} />
                {error && <p>{error}</p>}
            </InputStyled>
        )
    }
)

const InputStyled = styled.div`
    margin-top: 2rem;
    position: relative;
    width: 100%;
    label{
        position: absolute;
        left: 20px;
        top: -17px;
        display: inline-block;
        background-color: var(--background-dark-color);
        padding: 0 .5rem;
        font-size: 1.2rem;
        color: inherit;
    }
    input{
        border: 1px solid var(--border-color);
        outline: none;
        background: transparent;
        height: 40px;
        padding: 0 15px;
        width: 100%;
        color: inherit;
        box-shadow: none;
        min-width: 150px;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.6;
        filter: invert(0.6);
    }

    input[type="date"]::-webkit-calendar-picker-indicator:hover {
        opacity: 1
    }
    
    p {
        margin: 0;
        padding: 0;
        text-align: center;
        color: red;
        font-size: .9rem;
    }
`
export default Input