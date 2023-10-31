import React from 'react'

const Navbar = () => {

    return (
        <div className='container z-10 group flex flex-row items-center justify-center absolute w-12 h-12 duration-75 hover:w-2/12 bg-white rounded-full mx-3 my-4'>
            <p className='text-orange-400 left-4 top-3 absolute mx-0 cursor-default'>W</p>
            <p className='text-orange-400 hidden group-hover:translate-x-14 group-hover:inline '>D</p>
        </div>
    )
}

export default Navbar