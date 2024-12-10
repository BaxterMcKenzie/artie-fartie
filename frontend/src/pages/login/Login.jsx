import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import './login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login, error, isLoading } = useLogin(); // Use error from the hook directly

    // States for different screen sizes
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1350);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 992);
    const [isPhone, setIsPhone] = useState(window.innerWidth <= 600);

    const navigate = useNavigate();

    // Handle screen resize events
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1350);
            setIsTablet(window.innerWidth <= 992);
            setIsPhone(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email and password presence
        if (!email || !password) {
            setErrorMessage('Email and password are required.');
            return;
        }

        // Validate password using regex
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must be at least 8 characters long, include one special character, one uppercase letter, and one number.');
            return;
        }

        // Predefined error message for login credentials
        const predefinedMessage = '\nEmail: user@gmail.com\nPassword: Password1234%';

        // Call login and wait for the response
        await login(email, password);

        if (!error) {
            navigate('/');
        } else {
            // If the error occurs, display the predefined credentials
            setErrorMessage(predefinedMessage);
        }
    };

    const handleSkip = () => {
        // Navigate to home page
        navigate('/');
    };

    return (
        <div className='login-body'>
            <img
                className='login-header'
                src='../../../images/login-title-img.webp'
                alt='Login Image'
            />

            <form className='login' onSubmit={handleSubmit}>
                <div className='card-background'>
                    <img
                        className='card-image'
                        src={
                            isPhone
                                ? '../../../images/signup-login-phone.png'
                                : isTablet
                                ? '../../../images/signup-login-tablet.png'
                                : isSmallScreen
                                ? '../../../images/signup-login-small-screen.png'
                                : '../../../images/signup-login.png'
                        }
                        alt='card-background'
                    />

                    <div className='login-input-label'>
                        <div className='label-input'>
                            <label>Email:</label>
                            <div className='box-background'>
                                <input
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>

                        <div className='label-input'>
                            <label>Password:</label>
                            <div className='box-background'>
                                <input
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                        </div>

                        <div className='login-button'>
                            <button className='add-post-btn' disabled={isLoading}>Login</button>
                            {error && (
                                <div
                                    className="error-message"
                                    dangerouslySetInnerHTML={{
                                        __html: error.replace(/\n/g, '<br />') // Add line breaks here
                                    }}
                                />
                            )}
                        </div>

                        {/* Display error message */}
                        {errorMessage && (
                            <div className='error-message'>
                                {errorMessage.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </form>

            <button className='add-post-btn' onClick={handleSkip}>Skip now</button>
        </div>
    );
};

export default Login;
