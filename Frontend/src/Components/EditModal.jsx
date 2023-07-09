import { Dialog, Transition , Popover} from '@headlessui/react'
import { Fragment, useState } from 'react'
import TaskAdd from './TaskAdd'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Datepicker from "react-tailwindcss-datepicker"; 

export default function MyModal(props) {
  let [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(props.title);

  function closeModal() {
    setIsOpen(false)
    // setTitle(props.title)
    // setValue({startDate: new Date(props.due), endDate: new Date(props.due)})
  }

  function openModal() {
    setIsOpen(true)
  }

  const [value, setValue] = useState({ 
    startDate: new Date(props.due),
    endDate: new Date(props.due)
}); 

const handleValueChange = (newValue) => {
    setValue(newValue); 
} 

const handleTitleChange = (e) => {
    setTitle(e.target.value)
}

const onFormSubmit = (e) => {
    e.preventDefault();
    if (title == '' || value.startDate == '' || value.startDate == null) return
    if (title === props.title && value.startDate == props.due) return
    props.onUpdate(title, value.startDate, props.id)
}

const today = new Date()
const tomorrow = today.setDate(today.getDate()+1)
const nextWeek = today.setDate(today.getDate()+6)

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <button
          type="button"
          onClick={openModal}
          className="px-0 py-0 mx-0 my-0"
        >
          <PencilSquareIcon className="h-5 w-5 text-slate-500 dark:text-slate-200 hover:text-slate-700 dark:hover:text-slate-500 transition-all ease-in-out duration-400" aria-hidden="true"/>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black dark:bg-opacity-40 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform rounded-2xl text-left align-middle transition-all fixed bottom-6 sm:bottom-10 left-0 right-0">
                <form onSubmit={onFormSubmit} className={`container w-11/12 lg:w-4/5 mx-auto bg-slate-100 dark:bg-slate-800 border border-solid rounded-lg sm:px-4 sm:py-3 px-3 pb-3 pt-2 flex-auto flex flex-wrap items-center place-content-between border-slate-300 dark:border-slate-600 shadow-md transition-all delay-[95ms] duration-800 ease-in-out`}>
                        <div className="container flex flex-wrap sm:space-x-4 space-x-2 items-center w-full lg:w-3/5">
                            <div className={`container w-4 h-4 rounded-full inline-block border-2 border-solid border-slate-700 dark:border-slate-400`}>
                            </div>
                            <div className="w-4/5 flex-col flex">
                                <input className="px-2 py-2 w-full bg-inherit focus:outline-none text-amber-800 dark:text-slate-200 dark:placeholder:text-slate-300 font-medium rounded-md justify-self-stretch" placeholder="Add Task" type="text" name="task" value={title} onChange={handleTitleChange}/>
                            </div>
                        </div>
                        <div className="container flex flex-wrap sm:space-x-4 space-x-1 items-center sm:w-3/5 lg:w-1/5 md:w-2/5 xl:w-fit  w-4/6">
                                <Datepicker
                                    useRange={false}
                                    asSingle={true}
                                    value={value}
                                    onChange={handleValueChange}
                                    displayFormat={"D MMM, YYYY"}
                                    placeholder={"Pick a Date"}
                                    startFrom={new Date()}
                                    primaryColor={"amber"}
                                    readOnly={true}
                                    popoverDirection="up"
                                    minDate={new Date()}
                                    showShortcuts={true}
                                    configs={{
                                        shortcuts: {
                                        today: "Today", 
                                        tomorrow: { 
                                            text: "Tomorrow",
                                            period: {
                                            start: tomorrow,
                                            end: tomorrow
                                            }
                                        }, 
                                        nextWeek: {
                                            text: "Next Week",
                                            period: {
                                                start: nextWeek,
                                                end: nextWeek
                                            }
                                        }
                                        },
                                    }
                                }
                                />
                        </div>
                        <button type='submit' className="px-6 py-2 border border-solid rounded-lg bg-slate-200 dark:bg-slate-700 font-medium text-sm text-slate-600 dark:text-slate-200 hover:border-slate-400 dark:border-slate-500 dark:hover:border-slate-400 transition-all duration-300" onClick={closeModal}>Edit</button>
                    </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
