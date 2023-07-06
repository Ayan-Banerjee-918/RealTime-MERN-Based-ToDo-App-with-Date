import { Link } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Calendar from './Calendar'

const Navbar = () => {
    return (
        <>
            <div className='h-full w-full bg-gradient-to-b from-[#05101a] to-slate-800 bg-clip-padding backdrop-filter backdrop-blur-lg z-50'>
                <div className="flex justify-center items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
                    <h1 className="w-full text-3xl font-bold text-[#000df9a]">
                        <Link to="/">TODO</Link>
                    </h1>
                    <Calendar/>
                    <UserCircleIcon className="h-16 w-16" aria-hidden="true"/>
                </div>
            </div>
      </>
  )
}

export default Navbar