import React from 'react';

import { useModalContext } from '../state/modal-context'
import styled from 'styled-components';
interface Props { }

const ButtonModal: React.FC<Props> = () => {
    const {setModalType} = useModalContext()

    return (
        <ButtonWrapper>
            {/* <Button onClick={() => setModalType('signIn')}>Sign-In</Button>
            <Button onClick={() => setModalType('signUp')}>Sign-Up</Button> */}
            <Button onClick={() => setModalType('login')}>Login</Button>
            <Button onClick={() => setModalType('register')}>Register</Button>
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-flow: wrap;
    gap: 3.5rem;
	margin-top: 1rem;
`;

export const Button = styled.button`
	border-radius: 4px;
	background: none;
	white-space: nowrap;
	padding: 10px 20px;
	font-size: 18px;
	color:var(--primary-color);
	outline: none;
	border: 2px solid var(--primary-color);
	cursor: pointer;
	overflow: hidden;
	position: relative;
	&:before {
		background: var(--primary-color);
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
		transition: all 0.6s ease;
		width: 100%;
		height: 0%;
		transform: translate(-50%, -50%) rotate(45deg);
	}
	&:hover:before {
		height: 500%;
		width: 200%;
	}
	&:hover {
		color: var(--background-dark-color);
	}
`;

export default ButtonModal;