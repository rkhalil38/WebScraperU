import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { BsLinkedin } from 'react-icons/bs'
import Link from 'next/link'

const Navbar = () => {

    
    return (
        <div className='container flex bg-orange-400 flex-row items-center justify-center absolute w-24 h-12 rounded-lg mx-3 my-3'>
            <Link href='https://github.com/rkhalil38/WebScraperU' rel="noopener noreferrer" target="_blank" className='text-white px-[5px] py-1 w-10 h-10 rounded-lg hover:bg-orange-500 text-3xl cursor-pointer'><AiFillGithub/></Link>
            <Link href='https://www.linkedin.com/in/romulus-khalil/' rel="noopener noreferrer" target="_blank" className='text-white px-2 py-2 w-10 h-10 rounded-lg hover:bg-orange-500 text-2xl cursor-pointer'><BsLinkedin/></Link>
        </div>
    )
}

export default Navbar