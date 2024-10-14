// import axios from "axios";
// import { useState } from "react";
// import {useAuthContext} from './useAuthContext'

// const baseURL = import.meta.env.VITE_API_BASE_URL

// export const useSignup = () => {
//     const [error, setError] = useState(null)
//     const [isLoading, setIsLoading] = useState(null)

//     const {dispatch} = useAuthContext()

//     const signup = async (email,password) => {
//         setIsLoading(true)
//         setError(null)
    
//         try {
//             const response = await axios.post(`${baseURL}/api/user/signup`, 
//                 { email, password }, 
//                 { headers: { 'Content-Type': 'application/json' } }
//             );

//             if (response.status !== 200) {
//                 setIsLoading(false)
//                 setError(error.response.data.error)
//             }
//             if (response.status === 200) {
//                 localStorage.setItem('user', JSON.stringify(response.data))
//                 dispatch({type: 'LOGIN', payload: response.data})
    
//                 setIsLoading(false)
//             }
            
//         } catch (error) {
//             setError(error.response.data.error)
//             setIsLoading(false)
//         }
//     }

//     return {signup, isLoading, error}
// }

import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState('Signups are disabled for display purposes.'); // Initialize with error message
    const [isLoading, setIsLoading] = useState(false);  // Default to false to avoid loading state issues
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        // Ensure signup is blocked without further interaction
        setIsLoading(false);
    };

    return { signup, isLoading, error };
};
