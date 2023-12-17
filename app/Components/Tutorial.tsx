"use client";
import { useEffect, useState } from "react";
import { BsXLg } from 'react-icons/bs'
import Image from 'next/image'
import tutorialPic from '../tutorial.png'


//added tutorial because original context was not clear enough
const Tutorial = () => {

    const [isActive, setIsActive] = useState(true)
    const [position, setPosition] = useState('translate-y-[120%]')

    const handleToggle = () => {
        setIsActive(!isActive)
    }

    useEffect(() => {

        setPosition('translate-y-0')

    }, [])
    return (
        <div className="container flex w-full">
            
            { isActive? 
                <div className={`flex duration-200 ${position} flex-row my-2 bg-orange-400 w-full rounded-lg`}>
                    <div className="w-1/12 h-full rounded-l-lg"></div>
                    <div className="w-10/12 h-full">
                        <h1 className="text-white text-2xl font-semibold text-center mt-2 mb-1">Welcome to WebScraperU!</h1>
                        <p className="text-white font-semibold text-center mb-2">Here is a quick example on how to use your own webscraper.</p>
                        <Image className="rounded-lg pb-4"
                            src={tutorialPic} 
                            alt="tutorial" 
                            width={900} 
                            height={500}
                        />
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