import success from '../assets/success.png'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import { useSelector } from 'react-redux'

const getInitialTheme = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        return true
      } else {
        document.documentElement.classList.remove('dark')
        return false
      }
}

const Signup = () => {

    const API_URL = useSelector((state) => state.API_URL)
    const [password, setPassword] = useState('')
    const [confirmpass, setConfirmPass] = useState('')
    const [userNameError, setUsernameError] = useState(false)
    const [passValidationError, setValidationError] = useState(false)

    const onPassChange = (e) => {
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

    const onFormSubmit = (e) => {
        e.preventDefault();
        // if (username == '' || password == '' || confirmpass == '') return
        // if (password != confirmpass) return
        // fetch(API_URL+"/user", {
        //     method: "POST",
        //     body: {
        //         username: username,
        //         password: password
        //     }
        // })

        // e.target.reset();
    }

    useEffect(() => {
        getInitialTheme()
    })

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
                                <input type="text" className="peer mt-1 block w-60 px-3 py-2 bg-white text-slate-800 dark:text-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-500 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-amber-500 dark:focus:border-amber-800 focus:ring-1 focus:ring-amber-500
                                invalid:border-red-500 invalid:text-red-600
                                focus:invalid:border-red-500 focus:invalid:ring-red-500
                                " pattern="^[a-z0-9]{4,}$"/>
                                <p className="absolute bottom-[-17px] mt-2 invisible peer-invalid:visible dark:text-red-300 text-red-500 font-medium text-xs">
                                    Minimum 4 alphanumeric characters.
                                </p>
                            </label>
                            <label className="block relative">
                                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Password</span>
                                <input type="password" className="peer mt-1 block text-slate-800 dark:text-slate-200 w-60 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-amber-500 dark:focus:border-amber-800 focus:ring-1 focus:ring-amber-500
                                invalid:border-red-500 invalid:text-red-600
                                focus:invalid:border-red-500 focus:invalid:ring-red-500 caret-amber-500
                                " pattern='.{8,}' onChange={onPassChange}/>
                                <p className="absolute bottom-[-19px] mt-2 invisible peer-invalid:visible dark:text-red-300 text-red-500 font-medium text-xs">
                                    Length should be minimum 8.
                                </p>
                            </label>
                            <label className="block relative">
                                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Confirm Password</span>
                                <input type="password" className={`peer mt-1 block text-slate-800 dark:text-slate-200 w-60 px-3 py-2 bg-white dark:bg-slate-700 border rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:ring-1 ${passValidationError ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500': 'focus:border-amber-500 dark:focus:border-amber-800 focus:ring-amber-500 border-slate-300 dark:border-slate-500'}
                                `} onChange={validatePassword}/>
                                <p className={`absolute bottom-[-19px] mt-2 ${passValidationError ? 'visible': 'invisible'} dark:text-red-300 text-red-500 font-medium text-xs`}>
                                    Passwords do not match.
                                </p>
                            </label>
                            <button type='submit' className="mt-4 px-6 py-2 border-2 border-solid rounded-lg border-amber-400 hover:border-amber-500 bg-amber-500 hover:bg-amber-600 dark:bg-[#2f2600] font-semibold text-sm text-slate-50 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-amber-900 dark:hover:border-amber-700 transition-all duration-300">Sign up</button>
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