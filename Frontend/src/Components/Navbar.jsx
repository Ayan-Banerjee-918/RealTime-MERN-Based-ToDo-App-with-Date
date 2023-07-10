import { Link, useNavigate } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Calendar from './Calendar'
import success from '../assets/success.png'
import { Menu } from '@headlessui/react'
import Dropdown from './Dropdown'
import ThemeToggler from './ThemeToggler'


const Navbar = (props) => {
    return (
        <>
            <div className='h-15 w-full z-40 bg-slate-50 dark:bg-slate-900 transition-[background-color] duration-800'>
                <div className="flex justify-center items-center h-24 max-w-[1240px] mx-auto px-4 bg-transparent">
                    <h1 className="w-full text-3xl font-bold">
                        <div className='flex text-slate-800 dark:text-slate-200 text-lg items-center'>
                            T
                            <img src={success} alt='logo' className='w-10 h-10'/>
                             do</div> 
                    </h1>
                <ThemeToggler/>
                <Dropdown signOut={()=>props.signOut()}/>
                </div>
            </div>
      </>
  )
}

export default Navbar