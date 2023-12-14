"use client";
import { useEffect, useState } from "react";
import DisplayBoxes from "./DisplayBoxes";

interface FormData {
    words: string[],
    urls: string,
    user_id: string
}

const Searchbar = ({ url }: {url: string}) => {

    const [submitEvent, setSubmitEvent] = useState(0)

    const [formData, setFormData] = useState<FormData>({
        words: [],
        urls: "",
        user_id: "",
    })


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

        let queries = value.replace(/\],\s*/g, '],').trim();
        const wordList = queries.split('],')
        wordList.forEach((word, index) => {
            
            let wordToAdd = ''

            if (word[0] == '['){
                wordToAdd = word.slice(1)
            }
            
            if (word[word.length - 1] == ']'){
                wordToAdd = wordToAdd.slice(0, word.length - 2)
            }

            wordList[index] = wordToAdd
        })

        setFormData((prevFormData) => ({
            ...prevFormData,
            words: wordList,
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
            <form onSubmit= {handleSubmit} className='flex flex-col items-center justify-center h-96 w-full rounded-md'>
                <h1 className='mx-auto select-none text-2xl font-semibold py-2'>Your own webscraper.</h1>
                <input 
                    name= "words"
                    type="text" 
                    className='container mx-auto bg-white text-black rounded-md mb-2 w-full h-12 px-2 focus:outline-none' 
                    placeholder='Enter your string(s) here, wrapped in brackets. Separate multiple queries with commas.'
                    onChange={handleWordChange}
                /> 
                <input 
                    name= "urls"
                    type="text" 
                    className='container mx-auto bg-white text-black rounded-md mb-2 w-full h-12 px-2 focus:outline-none' 
                    placeholder='Enter your url(s) here, separated by commas.'
                    onChange={handleURLChange}
                />
                <button type="submit" className='bg-white rounded-md py-2 px-2 hover:bg-gray-100 text-orange-400'>Scrape!</button>
            </form>
            <DisplayBoxes formData= { formData } url= { url } submitEvent={ submitEvent }/>
        </div>
  )
}

export default Searchbar