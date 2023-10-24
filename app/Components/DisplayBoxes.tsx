"use client";
import React, { useEffect, useState } from 'react'
import { Interface } from 'readline';
import { json } from 'stream/consumers';

interface FormData {
    words: string,
    urls: string,
    user_id: string
}

const DisplayBoxes = ({ formData, url, submitEvent }: {formData: FormData, url: string, submitEvent: number}) => {

    const [manipulatedData, setManipData] = useState({
        words: '',
        urls: '',
    })

    useEffect((() => {

        const fetching_url = url +  '?words=' + formData['words'] + '&urls=' + formData['urls']
        

        const retrieveUserData = async () => {

            const get_response = await fetch(fetching_url, {
                method: 'GET'
            })

            const dataToLog = await get_response.json()
            console.log(dataToLog)

        }

        retrieveUserData()

    }), [submitEvent])

    return (
        <div className='container text-black rounded-md bg-white w-full h-1/2'>
            {formData['words']}{formData['urls']}
        </div>
    )
}

export default DisplayBoxes