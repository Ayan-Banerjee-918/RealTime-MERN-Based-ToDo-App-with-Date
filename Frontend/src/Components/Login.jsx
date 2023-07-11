import Navbar from './Navbar'
import success from '../assets/success.png'
import LoadingIcon from './LoadingIcon'
import { useEffect } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

import {updateToken, updateUsername, updateLoggedInState} from '../store/userStore'

const localStorageContainsTodos = () => {
    let local_todos = localStorage.getItem('todos')
        if(local_todos != null || local_todos != '') {
            try {
                local_todos = JSON.parse(local_todos);
                return local_todos
            } catch (err) {
                return null
            } 
        }else {
            return null
        }
}

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [userErrorText, setUserErrorText] = useState('')
    const [passErrorText, setPassErrorText] = useState('')
    const [loading, setLoading] = useState(false)

    const API_BASE = useSelector((state) => state.user.API_BASE)
    const redux_token = useSelector((state)=>state.user.token)
    const isLoggedIn = useSelector((state)=>state.user.isLoggedIn)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const {state} = useLocation()

    useEffect(() => {
        if (isLoggedIn)
            navigate("/")
    })

    const localStoragetoDB = async (auth_token) => {
        const local_todos = localStorageContainsTodos()
        if (local_todos?.length > 0) {
            await fetch(API_BASE+"todo/addMultiple", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+auth_token
                },
                body: JSON.stringify(local_todos),
                credentials: 'include'
            }).then(res => {
                   if (res.status == 201) {
                    console.log("Synced")
                    localStorage.removeItem('todos')
                   } 
            });
        }
    } 

    const onUsernameChange = (e) => {
        setUsernameError(false)
        setUsername(e.target.value)
    }

    const onPassChange = (e) => {
        setPassError(false)
        setPassword(e.target.value)
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (loading) return
        if (username === '') {
            setUsernameError(true)
            setUserErrorText('Required.')
            if (password === '') {
                setPassError(true)
                setPassErrorText('Required.')
            }
            return
        }
        if (password === '') {
            setPassError(true)
            setPassErrorText('Required.')
            return
        }
        
        setLoading(true)
        await fetch(API_BASE + 'user/login', { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            const status = res.status
            setLoading(false)
            if (status == 200){
                return res.json()
            } else if(status == 402) {
                setUsernameError(true);
                setUserErrorText('User not found.');
                throw new Error(402)
            } else if(status == 403) {
                setPassError(true);
                setPassErrorText("Incorrect password.")
                throw new Error(403)
            } else {
                toast.error("Something went wrong!");
                throw new Error("Something went wrong")
            }
        }).then(async res=>{
            toast.success('Logged in successfully.')
            localStorage.setItem('token', res.token)
            dispatch(updateToken(res.token))
            dispatch(updateUsername(username))
            dispatch(updateLoggedInState(true))
            await localStoragetoDB(res.token)
            navigate(state?.path || '/')
        }).catch((err)=> {
            console.log("Error: "+err)
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
                                focus:invalid:border-red-500 focus:invalid:ring-red-500 caret-amber-500 ${usernameError ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500': 'focus:border-amber-500 dark:focus:border-amber-800 focus:ring-amber-500 border-slate-300 dark:border-slate-500'}
                                `} pattern="^[A-Za-z0-9]{4,}$" onChange={onUsernameChange} maxLength={15}/>
                                <p className="absolute bottom-[-19px] mt-2 invisible peer-invalid:visible dark:text-red-300 text-red-500 font-medium text-xs">
                                    Minimum 4 alphanumeric characters.
                                </p>
                                <p className={`absolute bottom-[-19px] mt-2 ${usernameError ? 'visible': 'invisible'} dark:text-red-300 text-red-500 font-medium text-xs`}>
                                    {userErrorText}
                                </p>
                            </label>
                            <label className="block relative">
                                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Password</span>
                                <input type="password" className={`peer mt-1 block text-slate-800 dark:text-slate-200 w-60 px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-amber-500 dark:focus:border-amber-800 focus:ring-1 focus:ring-amber-500
                                invalid:border-red-500 invalid:text-red-600
                                focus:invalid:border-red-500 focus:invalid:ring-red-500 caret-amber-500 ${passError ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500': 'focus:border-amber-500 dark:focus:border-amber-800 focus:ring-amber-500 border-slate-300 dark:border-slate-500'}
                                `} autoComplete='on' onChange={onPassChange} maxLength={20}/>
                                <p className={`absolute bottom-[-19px] mt-2 ${passError ? 'visible': 'invisible'} dark:text-red-300 text-red-500 font-medium text-xs`}>
                                    {passErrorText}
                                </p>
                            </label>
                            <div className="flex gap-4 flex-col justify-center">
                            <button type='submit' className="flex w-full justify-center gap-2 mt-4 px-6 py-2 border-2 border-solid rounded-lg border-amber-400 hover:border-amber-500 bg-amber-500 hover:bg-amber-600 dark:bg-[#A8750F] font-semibold text-sm text-slate-50 dark:text-slate-50 dark:border-[#E8A215] dark:hover:bg-[#694909] dark:hover:border-[#E8A215] transition-all duration-300">
                                {loading?
                                <svg className={`h-5 w-5 animate-spin`} viewBox="3 3 18 18">
                                <path
                                className={`fill-amber-50 dark:fill-amber-100`}
                                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                            </svg>:
                                'Log in'}
                            </button>
                            <Link to="/" className="flex w-full justify-center px-6 py-2 border-2 border-solid rounded-lg border-slate-50 hover:border-slate-300 bg-slate-200 dark:bg-slate-700 font-semibold text-sm text-slate-500 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600 dark:hover:border-slate-500 transition-all duration-300">
                                Continue without login
                            </Link>
                            <Link to="/signup" className='cursor-pointer text-sm text-center  text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'>Sign up</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex-col items-center space-y-2 max-w-[1100px] w-full mx-auto rounded-xl'>       
                </div>
            </div>
    )
}

export default Login