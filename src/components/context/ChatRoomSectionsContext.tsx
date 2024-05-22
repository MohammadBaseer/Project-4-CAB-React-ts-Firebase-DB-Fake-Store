import { ReactNode, createContext, useState } from "react";

// type toggleStateType = {
//     toggleState:number

// }

type ChatRoomSectionToggleType = {
    toggleState: number,
    setToggleState: (index: number) => void
}

const ChatRoomSectionToggleInitValue = {
    toggleState: 1,
    setToggleState: () => {throw new Error("context not initialed");},
}

type childrenProps ={
    children: ReactNode
}


export const ChatRoomSectionToggle = createContext<ChatRoomSectionToggleType>(ChatRoomSectionToggleInitValue);


export const ChatRoomSectionToggleProvider = ({children}:childrenProps) => {
    const [toggleState, setToggleState] = useState<number>(1)

    return(
        <ChatRoomSectionToggle.Provider value={{toggleState, setToggleState}}>
            {children}
        </ChatRoomSectionToggle.Provider>
    )
}