import React from 'react'
import TaskCard from "./TaskCard"

const Home = () => {
    return (
        <div className='antialiased'>
            <div className='h-screen w-full rounded-b-lg px-8'>
                <div className='max-w-[1100px] w-full mx-auto py-8'>
                    <h1 className='font-bold text-2xl'>Tasks</h1>
                </div>
                <div className='flex-col space-y-2 max-w-[1100px] w-full mx-auto rounded-xl z-0'>
                    <TaskCard/>
                    <TaskCard/>
                    <TaskCard/>
                    <TaskCard completed={true}/>
                </div>
            </div>
        </div>
  )
}

export default Home