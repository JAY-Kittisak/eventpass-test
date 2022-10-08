import React, {
    createContext,
    ReactElement,
    Dispatch,
    SetStateAction,
    useState,
    useEffect,
    useContext,
    ReactNode
} from 'react'

import Register from '../components/auth/Register'
import Login from '../components/auth/Login'

interface Props {
    children: ReactNode
}

type ModalType = 'close' | 'register' | 'login'
type Modals = {
    [key in ModalType]: ReactElement | null
}

type ModalState = {
    modal: ReactElement | null
}

type ModalDispatch = {
    setModalType: Dispatch<SetStateAction<ModalType>>
}

const ModalStateContext = createContext<ModalState | undefined>(undefined)
const ModalDispatchContext = createContext<ModalDispatch | undefined>(undefined)

const modals: Modals = {
    close: null,
    register: <Register />,
    login: <Login />
}

const ModalContextProvider: React.FC<Props> = ({ children }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [modalType, setModalType] = useState<ModalType>('close')

    useEffect(() => {
        setModal(modals[modalType])
    }, [modalType])

    return (
        <ModalStateContext.Provider value={{ modal }}>
            <ModalDispatchContext.Provider value={{ setModalType }}>
                {children}
            </ModalDispatchContext.Provider>
        </ModalStateContext.Provider>
    )
}

export default ModalContextProvider

export const useModalContext = () => {
    const modalState = useContext(ModalStateContext)
    const modalDispatch = useContext(ModalDispatchContext)

    if ((modalState === undefined) || (modalDispatch === undefined)) throw new Error(
        'useModalContext must be used within the ModalContextProvider.'
    )

    return { ...modalState, ...modalDispatch }
}