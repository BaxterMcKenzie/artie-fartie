import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.scss';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup(); // Use error from the hook directly
    const navigate = useNavigate();

    // Handle screen size state
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1350);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 992);
    const [isPhone, setIsPhone] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1350);
            setIsTablet(window.innerWidth <= 992);
            setIsPhone(window.innerWidth <= 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return setErrorMessage('Valid Email and password are required.');
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            return setErrorMessage(
                'Password must be at least 8 characters long, include one special character, one uppercase letter, and one number.'
            );
        }

        // Call signup and wait for the response
        await signup(email, password);

        if (!error) {
            navigate('/'); // Navigate to home on success
        }
    };

    const handleSkip = () => navigate('/');

    return (
        <div className='login-body'>
            <img
                className='login-header'
                src='../../../public/images/signup-title-img.webp'
                alt='Signup Image'
            />
            <form className='login' onSubmit={handleSubmit}>
                <div className='card-background'>
                    <img
                        className='card-image'
                        src={
                            isPhone
                                ? '../../../public/images/signup-login-phone.png'
                                : isTablet
                                ? '../../../public/images/signup-login-tablet.png'
                                : isSmallScreen
                                ? '../../../public/images/signup-login-small-screen.png'
                                : '../../../public/images/signup-login.png'
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
                            <button className='add-post-btn' disabled={isLoading}>
                                Sign up
                            </button>
                        </div>
                        {/* Display error message */}
                        {error && <div className='error-message'>{error}</div>}
                    </div>
                </div>
            </form>
            <button className='add-post-btn' onClick={handleSkip}>
                Skip now
            </button>
        </div>
    );
};

export default Signup;
