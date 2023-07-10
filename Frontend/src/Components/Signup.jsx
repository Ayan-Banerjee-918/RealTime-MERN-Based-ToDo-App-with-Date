import success from '../assets/success.png'
import LoadingIcon from './LoadingIcon'
import { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast, {Toaster} from 'react-hot-toast'
import Navbar from './Navbar'

const Signup = () => {

    const API_BASE = useSelector((state) => state.user.API_BASE)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpass, setConfirmPass] = useState('')
    const [userNameError, setUsernameError] = useState(false)
    const [passValidationError, setValidationError] = useState(false)
    const [passError, setPassError] = useState(false)

    const [userErrorText, setUserErrorText] = useState('')
    const [passErrorText, setPassErrorText] = useState('')
    
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const onUsernameChange = (e) => {
        setUsernameError(false)
        setUsername(e.target.value)
    }

    const onPassChange = (e) => {
        setPassError(false)
        setPassword(e.target.value)
        if (e.target.value === confirmpass) {
            setValidationError(false)
        }
    }

    const validatePassword = (e) => {
        setConfirmPass(e.target.value)
        if (password === e.target.value) {
            setValidationError(false)
            return
        }
        
        setValidationError(true)
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (loading) return
        if (username == '') {
            setUsernameError(true)
            setUserErrorText('Required.')
            if (password == '') {
                setPassError(true)
                setPassErrorText('Required.')
            }
            return
        }
        if (password == '') {
            setPassError(true)
            setPassErrorText('Required.')
            return
        }
        if (password != confirmpass) {
            setValidationError(true)
            return
        }
        setUsernameError(false);
        setPassError(false);
        setLoading(true);
        await fetch(API_BASE + 'user/register', { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: 'include'
        }).then(res => {
            const status = res.status
            setLoading(false)
            if (status == 201){
                toast.success("Registered Successfully!");
                navigate('/login')
            } else if(status == 401) {
                setUsernameError(true);
                setUserErrorText('Username already exists.');
            } else {
                toast.error("Something went wrong!");
            }
        }); 
    }

    return (
        <div className='antialiased min-h-screen h-full dark:bg-slate-900 transition-[background-color] duration-800 relative bg-slate-200'>
             <div className='flex justify-center max-w-[1100px] w-full mx-auto py-8'>
                    <div className="mt-20 w-fit container bg-slate-100 rounded-lg px-12 py-7 shadow-lg dark:bg-slate-800">
                        <div className="flex w-full justify-center text-slate-800 dark:text-slate-200 text-lg items-center font-semibold mb-6">
                            T<img src={success} alt="logo"/>do
                        </div>
                        <form className="flex flex-col gap-6" noValidate onSubmit={onFormSubmit}>
                            <label className="block relative">
                                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Username</span>
                                <input type="text" className={`peer mt-1 block w-60 px-3 py-2 bg-white text-slate-800 dark:text-slate-200 dark:bg-slate-700 border rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-amber-500 dark:focus:border-amber-800 focus:ring-1 focus:ring-amber-500
                                invalid:border-red-500 invalid:text-red-600
                                focus:invalid:border-red-500 focus:invalid:ring-red-500 ${userNameError ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500': 'focus:border-amber-500 dark:focus:border-amber-800 focus:ring-amber-500 border-slate-300 dark:border-slate-500'}
                                `} pattern="^(?=.*[a-zA-Z])[A-Za-z0-9_]{4,}$" maxLength={15} onChange={onUsernameChange}/>
                                <p className="absolute bottom-[-17px] mt-2 invisible peer-invalid:visible dark:text-red-300 text-red-500 font-medium text-xs">
                                    Minimum 4 alphanumeric characters.
                                </p>
                                <p className={`absolute bottom-[-19px] mt-2 ${userNameError ? 'visible': 'invisible'} dark:text-red-300 text-red-500 font-medium text-xs`}>
                                    {userErrorText}
                                </p>
                            </label>
                            <label className="block relative">
                                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Password</span>
                                <input type="password" className={`peer mt-1 block text-slate-800 dark:text-slate-200 w-60 px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-amber-500 dark:focus:border-amber-800 focus:ring-1 focus:ring-amber-500
                                invalid:border-red-500 invalid:text-red-600
                                focus:invalid:border-red-500 focus:invalid:ring-red-500 caret-amber-500 ${passError ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500': 'focus:border-amber-500 dark:focus:border-amber-800 focus:ring-amber-500 border-slate-300 dark:border-slate-500'}
                                `} pattern='.{8,}$' onChange={onPassChange} maxLength={20}/>
                                <p className="absolute bottom-[-19px] mt-2 invisible peer-invalid:visible dark:text-red-300 text-red-500 font-medium text-xs">
                                    Length should be minimum 8.
                                </p>
                                <p className={`absolute bottom-[-19px] mt-2 ${passError ? 'visible': 'invisible'} dark:text-red-300 text-red-500 font-medium text-xs`}>
                                    {passErrorText}
                                </p>
                            </label>
                            <label className="block relative">
                                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Confirm Password</span>
                                <input type="password" className={`peer mt-1 block text-slate-800 dark:text-slate-200 w-60 px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:ring-1 ${passValidationError ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500': 'focus:border-amber-500 dark:focus:border-amber-800 focus:ring-amber-500 border-slate-300 dark:border-slate-500'}
                                `} onChange={validatePassword} maxLength={20}/>
                                <p className={`absolute bottom-[-19px] mt-2 ${passValidationError ? 'visible': 'invisible'} dark:text-red-300 text-red-500 font-medium text-xs`}>
                                    Passwords do not match.
                                </p>
                            </label>
                            
                            <button type='submit' className="flex w-full justify-center gap-2 mt-4 px-6 py-2 border-2 border-solid rounded-lg border-amber-400 hover:border-amber-500 bg-amber-500 hover:bg-amber-600 dark:bg-[#A8750F] font-semibold text-sm text-slate-50 dark:text-slate-50 dark:border-[#E8A215] dark:hover:bg-[#694909] dark:hover:border-[#E8A215] transition-all duration-300">
                            {loading ? 
                                <LoadingIcon color='amber' size="5"/> :
                                'Sign up'
                            }
                            </button>
                            <Link to="/login" className='cursor-pointer text-sm text-center  text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'>Log in</Link>
                        </form>
                    </div>
                </div>
                <div className='flex-col items-center space-y-2 max-w-[1100px] w-full mx-auto rounded-xl'>       
                </div>
            </div>
    )
}

export default Signup