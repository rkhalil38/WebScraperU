import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import Link from 'next/link'

const Navbar = () => {

    return (
        <div className='container flex bg-white flex-row items-center justify-center absolute w-40 h-12 rounded-lg mx-3 my-4'>
            <p className='text-orange-400 px-2 py-1 rounded-lg hover:bg-gray-200 text-lg cursor-default'>W</p>
            <Link href='https://github.com/rkhalil38' className='text-orange-400 px-2 py-1 rounded-lg hover:bg-gray-200 text-3xl cursor-pointer'><AiFillGithub/></Link>
            <p className='text-orange-400 px-2 py-1 rounded-lg hover:bg-gray-200 text-lg cursor-pointer'>API</p>
        </div>
    )
}

export default Navbar