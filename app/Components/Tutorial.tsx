"use client";
import { useEffect, useState } from "react";
import { BsXLg } from 'react-icons/bs'
import image from '../tutorial.png'

const Tutorial = () => {

    const [isActive, setIsActive] = useState(true)

    const handleToggle = () => {
        setIsActive(!isActive)
    }


    return (
        <div className="container flex w-full">
            
            { isActive? 
                <div className='flex flex-row bg-orange-500 w-full h-80 rounded-lg'>
                    <div className="w-1/12 h-full rounded-l-lg"></div>
                    <div className="w-10/12 h-full">
                        <h1 className="text-white text-2xl font-semibold text-center mt-2 mb-1">Welcome to WebScraperU!</h1>
                        <p className="text-white font-semibold text-center mb-2">Here's a quick example on how to use your own webscraper.</p>
                        <img src={ image.src } className="rounded-lg"></img>
                    </div>
                    <div className="w-1/12 text-right rounded-r-lg">
                        <button onClick={ handleToggle } className="text-white hover:text-red-600 px-3 py-3 text-3xl"><BsXLg/></button>
                    </div> 
                </div>       
            : 
            null}
            <div>

            </div>
        </div>
    )
}

export default Tutorial