"use client";
import { randomInt } from "crypto";
import { FormEvent, useEffect, useState } from "react";
import DisplayBoxes from "./DisplayBoxes";

interface FormData {
    words: string,
    urls: string,
    user_id: string
}

const Searchbar = ({ url }: {url: string}) => {

    
    const [formData, setFormData] = useState<FormData>({
        words: "",
        urls: "",
        user_id: "",
    })

    const [submitEvent, setSubmitEvent] = useState(0)

    useEffect( (() => {

        function generateRandomUserId(length = 8) {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let userId = '';
          
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * charset.length);
              userId += charset.charAt(randomIndex);
            }
          
            return userId;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            user_id: generateRandomUserId(),
        }))

        

    }), [])

    const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setFormData((prevFormData) => ({
            ...prevFormData,
            words: value,
        }))


    }

    const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        
        setFormData((prevFormData) => ({
            ...prevFormData,
            urls: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const post_response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        if (post_response.ok){
            const message = await post_response.json()
            console.log('Success:', message)

        } else {
            console.error('Error', post_response.statusText)
        }

        setSubmitEvent(submitEvent + 1)

    }



  return (
    <div className="w-full">
        <form onSubmit= {handleSubmit} className='flex flex-col items-center justify-center h-96 w-full bg-orange-400 rounded-md'>
            <h1 className='mx-auto text-2xl font-semibold py-2'>Ctrl+F but better.</h1>
            <input 
                name= "words"
                type="text" 
                className='container mx-auto bg-white text-black rounded-md mb-2 w-full h-12 px-2 focus:outline-none' 
                placeholder='Enter your word(s) here.'
                onChange={handleWordChange}

            />
            <input 
                name= "urls"
                type="text" 
                className='container mx-auto bg-white text-black rounded-md mb-2 w-full h-12 px-2 focus:outline-none' 
                placeholder='Enter your url(s) here.'
                onChange={handleURLChange}
            />
            <button type="submit" className='bg-green-400 rounded-md py-2 px-2 hover:bg-green-500'>Submit</button>
        </form>
        <DisplayBoxes formData= { formData } url= { url } submitEvent={ submitEvent }/>
    </div>
  )
}

export default Searchbar