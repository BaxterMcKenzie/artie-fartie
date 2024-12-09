import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const useLogin = () => {
    const [error, setError] = useState("\nEmail: user@gmail.com\nPassword: Password1234%");
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate(); // Initialize navigate

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        // Predefined credentials
        const validEmail = "user@gmail.com";
        const validPassword = "Password1234%";

        // Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        try {
            // Validate email format
            if (!emailRegex.test(email)) {
                throw new Error("Invalid email format.");
            }

            // Validate credentials
            if (email !== validEmail || password !== validPassword) {
                throw new Error(
                    "Invalid credentials. Use the following:\nEmail: user@gmail.com\nPassword: Password1234%"
                );
            }

            // Simulate login if credentials match
            const user = { email }; // Mock user data
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: "LOGIN", payload: user });

            setIsLoading(false);

            // Redirect to home page
            navigate("/");

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    // Return the login function, loading state, and error state
    return { login, isLoading, error };
};
