import { createContext, useReducer } from 'react';

export const CraftsContext = createContext()

export const craftsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CRAFTS':
            return {
                crafts: action.payload
            }
        
        case 'CREATE_CRAFTS':
            return {
                crafts: [ action.payload, ...state.crafts]
            }

        case 'DELETE_CRAFT':
            return {
                crafts: state.crafts.filter((craft) => craft._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CraftsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer (craftsReducer, {
        crafts: null
    })

    return (
        <CraftsContext.Provider value={{...state, dispatch}}>
            {children}
        </CraftsContext.Provider>
    )
}