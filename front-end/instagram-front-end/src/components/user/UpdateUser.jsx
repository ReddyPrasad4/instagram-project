import { useEffect, useState } from 'react'
import Input from '../input/Input'
import { getUserByName, updateUser } from '../../auth'
import { useNavigate } from 'react-router-dom'

const UpdateUser = () => {
    let navigate = useNavigate()
    let userName = localStorage.getItem("userName")

    const [formData, setFormData] = useState({
        id: '',
        userName: '',
        email: '',
        password: '',
        rePassword: '',
        mobileNumber: ''
    });
    const [errorMessage, setErrorMessage] = useState({
        userNameErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        mobileNumberErrorMessage: '',
        rePasswordErrorMessage: '',
        userCreatedMessage: ''
    })
    useEffect(() => {
        let currentUser = async () => {
            try {
                let response = await getUserByName(userName);
                console.log(response.data)
                setFormData(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        currentUser();
    }, [userName])
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrorMessage = {
            userNameErrorMessage: '',
            emailErrorMessage: '',
            passwordErrorMessage: '',
            mobileNumberErrorMessage: '',
            rePasswordErrorMessage: ''
        }
        let isValid = true;
        if (!formData.userName) {
            newErrorMessage.userNameErrorMessage = 'User name should not Be Empty'
            isValid = false
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            newErrorMessage.emailErrorMessage = 'Email should not Be Empty'
            isValid = false;
        }
        else if (!emailRegex.test(formData.email)) {
            newErrorMessage.emailErrorMessage = 'Email should be in proper format'
            isValid = false;
        }
        const passwordRegax = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (!formData.password) {
            newErrorMessage.passwordErrorMessage = 'Password should not be empty'
            isValid = false;
        }
        else if (!passwordRegax.test(formData.password)) {
            newErrorMessage.passwordErrorMessage = 'Password must contain Minimum eight characters, one uppercase letter, one lowercase letter, one number and one special character '
            isValid = false;
        }
        if (!formData.rePassword) {
            newErrorMessage.rePasswordErrorMessage = 'Please Re-enter your Password'
            isValid = false;
        }
        else if (formData.rePassword != formData.password) {
            newErrorMessage.rePasswordErrorMessage = 'Password not matched '
            isValid = false;
        }
        if (!formData.mobileNumber) {
            newErrorMessage.mobileNumberErrorMessage = 'Mobile number should not be empty'
            isValid = false;
        }
        else if ((formData.mobileNumber).length != 10) {
            newErrorMessage.mobileNumberErrorMessage = "Mobile Number Should Consist 10 numbers"
        }
        setErrorMessage(newErrorMessage)
        if (isValid) {
            let registerUser = async () => {
                try {
                    console.log(formData);
                    const response = await updateUser(formData);
                    console.log(response.data);
                    localStorage.setItem("userName", formData.userName)
                    setErrorMessage({ userCreatedMessage: 'Details Updated sucessfully' })
                    setTimeout(() => {
                        navigate('/home')
                    }, 1500)
                } catch (error) {
                    console.error('There was an error Updating:', error);
                }
            }
            registerUser();
        }
    }
    return (
        <div className="h-full pt-10 flex flex-col items-center justify-center">
            <div className="w-[450px] ">
                <button className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500"
                    onClick={()=> navigate("/home")} >
                    Back Home
                </button>

            </div>
            <form onSubmit={handleSubmit}>
                <h1 className='text-xxl text-fuchsia-700'> Update Details</h1>
                <Input
                    label="Enter Username : "
                    type="text" name="userName"
                    placeholder="Enter Username"
                    onChange={handleChange}
                    value={formData.userName}
                    errorMessage={errorMessage.userNameErrorMessage}
                />
                <Input
                    label="Enter email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={formData.email}
                    errorMessage={errorMessage.emailErrorMessage}
                />
                <Input
                    label="Enter password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.password}
                    errorMessage={errorMessage.passwordErrorMessage}
                />
                <Input
                    label="Re-enter password"
                    type="password"
                    name="rePassword"
                    placeholder="Re-enter your password"
                    onChange={handleChange}
                    value={formData.rePassword}
                    errorMessage={errorMessage.rePasswordErrorMessage}
                />
                <Input
                    label="Enter Mobile Number : "
                    type="tel"
                    name="mobileNumber"
                    placeholder="enter mobile-number"
                    onChange={handleChange}
                    value={formData.mobileNumber}
                    errorMessage={errorMessage.mobileNumberErrorMessage}
                />
                <button type="submit" >Submit</button>
                {errorMessage.userCreatedMessage && <h1 className="text-lg text-green-600" >{errorMessage.userCreatedMessage}</h1>}
            </form>
        </div>
    )
}

export default UpdateUser