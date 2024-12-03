import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Input from "../input/Input";
import { registration } from "../../auth";

const Register = () => {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        rePassword: '',
        mobileNumber: ''
    });
    const [errorMessage, setErrorMessage] = useState({
        userName: '',
        email: '',
        password: '',
        mobileNumber: '',
        rePassword: '',
        userCreatedMessage:''
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrorMessage({
            ...errorMessage,
            [name]: ''
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrorMessage = {
            userName: '',
            email: '',
            password: '',
            mobileNumber: '',
            rePassword: ''
        }
        let isValid = true;
        if (!formData.userName) {
            newErrorMessage.userName = 'User name should not Be Empty'
            isValid = false
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            newErrorMessage.email = 'Email should not Be Empty'
            isValid = false;
        }
        else if (!emailRegex.test(formData.email)) {
            newErrorMessage.email = 'Email should be in proper format'
            isValid = false;
        }
        const passwordRegax = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (!formData.password) {
            newErrorMessage.password = 'Password should not be empty'
            isValid = false;
        }
        else if (!passwordRegax.test(formData.password)) {
            newErrorMessage.password = 'Password must contain Minimum eight characters, one uppercase letter, one lowercase letter, one number and one special character '
            isValid = false;
        }
        if(!formData.rePassword)
        {
            newErrorMessage.rePassword='Please Re-enter your Password'
            isValid = false;
        }
        else if (formData.rePassword!=formData.password)
        {
             newErrorMessage.rePassword='Password not matched '
             isValid=false;
        }
        if (!formData.mobileNumber) {
            newErrorMessage.mobileNumber = 'Mobile number should not be empty'
            isValid = false;
        }
        else if(formData.mobileNumber.length!=10)
        {
            newErrorMessage.mobileNumber = 'Enter proper mobile number'
            isValid = false;
        }
        setErrorMessage(newErrorMessage)
        if (isValid) {
            let registerUser =async ()=>{
                try {
                    console.log(formData);
                    const response = await registration(formData)
                    console.log(response.data);
                    localStorage.setItem("userName",formData.userName)
                    setErrorMessage({userCreatedMessage : 'User Registered sucessfully'})
                    setTimeout(()=>{
                        navigate('/home')
                    },1500)
                    
                } catch (error) {
                    console.error(error);
                    setErrorMessage({userCreatedMessage :error.response.data.message})
                }
            }
            registerUser();
        }
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit}>
                <h1 className='text-xxl text-fuchsia-700'> User Registration Page</h1>
                <Input
                    label="Enter user name : "
                    type="text" name="userName"
                    placeholder="Enter Username"
                    onChange={handleChange}
                    value={formData.userName}
                    errorMessage={errorMessage.userName}
                />
                <Input
                    label="Enter email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={formData.email}
                    errorMessage={errorMessage.email}
                />
                <Input
                    label="Enter password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.password}
                    errorMessage={errorMessage.password}
                />
                <Input
                    label="Re-enter password"
                    type="password"
                    name="rePassword"
                    placeholder="Re-enter your password"
                    onChange={handleChange}
                    value={formData.rePassword}
                    errorMessage={errorMessage.rePassword}
                />
                  <Input
                    label="Enter mobile number : "
                    type="tel"
                    name="mobileNumber"
                    placeholder="enter mobile-number"
                    onChange={handleChange}
                    value={formData.mobileNumber}
                    errorMessage={errorMessage.mobileNumber}
                />
                <button type="submit" >Register</button>
                {errorMessage.userCreatedMessage && <p className={`${errorMessage.userCreatedMessage.includes("already")?"text-red-600 ":''} text-lg text-green-600`} >{errorMessage.userCreatedMessage}</p> }
                <p>Already have an account ? <span className='cursor-pointer text-blue-600 hover:text-blue-300' onClick={()=> navigate('/')}>Click here</span></p>
            </form>
        </div>
    )
}
export default Register