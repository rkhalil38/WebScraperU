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
            wordParam += '--' + activeWords[i]
        }
    }

    useEffect((() => {

        const fetching_url = url +  '?words=' + wordParam + '&urls=' + urlParam
        

        const retrieveUserData = async () => {

            const get_response = await fetch(fetching_url, {
                method: 'GET'
            })
            try{
                const data = await get_response.json()

                const data_array = Object.values(data)
                console.log(data_array)
            

                setScrapedData(data_array) 
            }
            catch(error){
                console.log(error)
            }

        }

        retrieveUserData()

    }), [submitEvent])

    //map scraped data to display boxes

    return (
        <div className='container flex flex-row text-black rounded-md w-full h-1/2'>
           {((scrapedData as Array<object>).length) > 0? ((scrapedData as Array<object>).map((data: any, index: number) => (
                <div key={index} className='container h-48 w-48 mx-2 flex flex-col rounded-md bg-white duration-75 cursor-pointer hover:-translate-y-1 hover:translate-x-1'>
                    <p className='text-1xl mx-auto pt-2 italic w-3/4 overflow-scroll'>{data.title}</p>
                    <p className='text-9xl mx-auto pt-0 self-center'>{data.rawMentions}</p>
                    <p className='text-2xl mx-auto'>mentions</p>
                </div>
            ))) : (<p>invalid component</p>)}
        </div>
    )
}

export default DisplayBoxes