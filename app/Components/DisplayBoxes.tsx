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

    const [scrapedData, setScrapedData] = useState<object>([])
    const activeURLs = formData['urls'].split(', ')
    const activeWords = formData['words'].split(', ')
    
    let wordParam = ''
    let urlParam = ''
    for (let i = 0; i < activeURLs.length; i++){
        if (i == 0){
            urlParam += activeURLs[i]
        }
        else{
            urlParam += '--' + activeURLs[i]
        }
    }

    for (let i = 0; i < activeWords.length; i++){
        if (i == 0){
            wordParam += activeWords[i]
        }
        else{
            wordParam += '-' + activeWords[i]
        }
    }

    useEffect((() => {

        const fetching_url = url +  '?words=' + wordParam + '&urls=' + urlParam
        

        const retrieveUserData = async () => {

            const get_response = await fetch(fetching_url, {
                method: 'GET'
            })

            const data = await get_response.json()

            const data_array = Object.values(data)
            console.log(data_array)

            setScrapedData(data_array)            

        }

        retrieveUserData()

    }), [submitEvent])

    //map scraped data to display boxes

    return (
        <div className='container flex flex-row text-black rounded-md w-full h-1/2'>
            {(scrapedData as Array<object>).map((data: any, index: number) => (
                <div key={index} className='container h-48 w-48 mx-2 flex justify-center items-center rounded-md bg-white'>
                    <p className='text-8xl'>{data.mentions.length}</p>
                </div>
            ))}
        </div>
    )
}

export default DisplayBoxes