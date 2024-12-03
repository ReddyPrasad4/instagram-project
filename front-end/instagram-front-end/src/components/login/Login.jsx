import Input from '../input/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../auth';


const Login = () => {
    const [credentials, setCredentials] = useState({
        userNameOrEmail: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState({
        userNameOrEmail: '',
        password: '',
        userFoundMessage: '',
    });
    let navigate = useNavigate();
    let handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials(({
            ...credentials,
            [name]: value,
        }))
        setErrorMessage(({
            ...errorMessage,
            [name]: '',
        }))
    
    }
    let handleFormSubmit = (event) => {
        event.preventDefault();
        let message = {
            userNameOrEmail: '',
            password: '',
            userFoundMessage: '',
        };
        let isValid = true;
        if (!credentials.userNameOrEmail) {
            isValid = false;
            message.userNameOrEmail = "User name should not be empty"
        }
        if (!credentials.password) {
            isValid = false;
            message.password = 'Password should not be empty'
        }
        setErrorMessage(message)
        if (isValid) {
            let validateAdminCredentials = async () => {
                console.log(credentials);
                try {
                    const response = await login(credentials);
                    console.log(response);
                    // localStorage.setItem("userName", response.data.userName);
                    navigate('/home')
                }
                catch (error) {
                    console.log(error);
                    // setErrorMessage({ userFoundMessage: error.response.data.message})
                }
            }
            validateAdminCredentials();
        }
        
    }
    return (
        <div className='h-screen flex items-center justify-center bg-stone-100'>
            <form onSubmit={handleFormSubmit}>
                <h1>Login Page</h1>
                <Input
                    label="Enter user name or email:"
                    type="text"
                    placeholder="Enter user name or email"
                    name="userNameOrEmail"
                    onChange={handleInputChange}
                    value={credentials.userNameOrEmail}
                    errorMessage={errorMessage.userNameOrEmail} />
                <Input
                    label="Enter Passowrd : "
                    type="password" name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    value={credentials.password}
                    errorMessage={errorMessage.password}
                />
                <button type="submit">Login</button>
                {errorMessage.userFoundMessage && <h2 className='text-red-500 font-bold'>{errorMessage.userFoundMessage}</h2>}
                <span >Don&apos;t have an account &nbsp;
                    <span className='text-blue-600 cursor-pointer hover:text-blue-300'
                        onClick={() => navigate("/register")}>
                        Create Account
                    </span >
                </span>
            </form>
        </div>
    )
}

export default Login