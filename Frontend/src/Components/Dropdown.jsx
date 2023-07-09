import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { UserCircleIcon, UserIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

export default function Dropdown(props) {
  const username = useSelector(state => state.user.username)
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  return (
    <div className="font-medium">
      <Menu as="div" className="relative inline-block text-left">
        <div className='mt-1'>
          <Menu.Button className="inline-flex w-full justify-center rounded-xl px-1 ml-1 text-sm font-medium text-white">
          <UserCircleIcon className="h-10 w-10 text-slate-400 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-100 transition-all duration-300" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-40"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-20"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-1 w-56 origin-top-right divide-y divide-gray-100 bg-slate-200 dark:bg-slate-800 border border-solid dark:border-slate-600 rounded-lg px-1 py-1 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              {isLoggedIn ?
              (<>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-100' : 'text-slate-500 dark:text-slate-200'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                  >
                    {active ? (
                      <UserIcon
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    ) : (
                      <UserIcon
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    )}
                    {username}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button onClick={()=>props.signOut()}
                    className={`${
                      active ? 'bg-red-200 dark:bg-red-900 text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-300'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ArrowRightOnRectangleIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowRightOnRectangleIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Sign Out
                  </button>
                )}
              </Menu.Item>
              </>)
              :
              (<Menu.Item>
                {({ active }) => (
                  <Link to="/login"
                    className={`${
                      active ? 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-100' : 'text-slate-500 dark:text-slate-200'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                  >
                    {active ? (
                      <ArrowLeftOnRectangleIcon
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowLeftOnRectangleIcon
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    )}
                    Log in
                  </Link>
                )}
              </Menu.Item>)
                    }
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
