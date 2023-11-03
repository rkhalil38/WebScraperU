"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Popup from 'reactjs-popup';

interface FormData {
    words: string[],
    urls: string,
    user_id: string
}

//write a function that generates me a random sequence of 10 characters
const generateRandomString = () => {
    let randomString = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 10; i++){
        randomString += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return randomString
}


const DisplayBoxes = ({ formData, url, submitEvent }: {formData: FormData, url: string, submitEvent: number}) => {

    const [scrapedData, setScrapedData] = useState<object>([])
    const [separatorSequence, setSeparatorSequence] = useState('')

    let activeURLs: string[] = formData['urls'].split(',')

    activeURLs.forEach((url, index) => {
        let idealURL = url.trim()
        activeURLs[index] = idealURL
    })

    let activeWords: string[] = formData['words']
    
    activeWords.forEach((word, index) => {
        activeWords[index] = word.replace(' ', '--')
    })

    
    let wordParam = ''
    let urlParam = ''
    for (let i = 0; i < activeURLs.length; i++){
        if (i == 0){
            urlParam += activeURLs[i]
        }
        else{
            urlParam += '---' + activeURLs[i]
        }
    }

    for (let i = 0; i < activeWords.length; i++){
        if (i == 0){
            wordParam += activeWords[i]
        }
        else{
            wordParam += '---' + activeWords[i]
        }
    }

    useEffect((() => {

        const fetching_url = url +  '?words=' + wordParam + '&urls=' + urlParam
        setSeparatorSequence(generateRandomString())

        setScrapedData([])
        

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
    <div className='container'>
            <div className='container flex flex-col px-2 text-black rounded-md w-full h-1/2'>
            {((scrapedData as Array<object>).length) > 0? ((scrapedData as Array<object>).map((data: any, index: number) => (
                    <div key= {index} className='container flex flex-row'>
                        <div className='flex my-auto cursor-default items-center justify-center text-center mr-2 h-14 w-14 rounded-lg bg-white'>
                            <p className='flex text-orange-400 text-2xl font-semibold'>{data.rawMentions}</p>
                        </div>
                        <Link href={{
                            pathname: '/mentions',
                            query: {
                                url: data.url,
                                mentions: data.mentions.join(separatorSequence),
                                rawMentions: data.rawMentions,
                                title: data.title,
                                separatorSequence: separatorSequence
                            }
                        }} rel="noopener noreferrer" target="_blank" className='container h-14 w-full my-2 flex flex-row rounded-md bg-white duration-75 cursor-pointer hover:-translate-y-1 hover:translate-x-1'>
                            <p className='flex text-1xl text-center my-4 pl-2 italic h-1/2 w-48 border-solid border-r-2 border-gray-300 overflow-auto'>{data.title}</p>
                            <div className='container italic flex flex-row px-2'>
                                {(data.mentions.length > 0)? (<p className='flex text-gray-500 h-1/2 w-full overflow-hidden my-4'>{data.mentions[0]}...</p>)
                                 : (<p className='container text-gray-500 h-1/2 w-full overflow-hidden my-4'>No mentions found. Try a different URL or String.</p>)}
                            </div>
                        </Link>
                    </div>
                ))) : (<div className='container flex flex-row'>
                        {((submitEvent) > 0? 
                            (<div className='container flex flex-row'>
                                <div className='flex my-auto cursor-default items-center justify-center text-center mr-2 h-14 w-14 rounded-lg bg-white'>
                                    <p className='text-orange-400 w-1/2 text-2xl font-semibold mx-auto'><Skeleton/></p>
                                </div>
                                <div className='container h-14 w-full my-2 flex flex-row rounded-md bg-white'>
                                    <div className='container flex text-1xl justify-center my-4 pl-2 italic h-1/2 w-48 border-solid border-r-2 border-gray-300 overflow-auto'>
                                        <p className='w-3/4'><Skeleton/></p>
                                    </div>
                                    <div className='container italic flex flex-row px-2'>
                                        <p className='container text-gray-500 h-1/2 w-full overflow-hidden my-4 mx-auto'><Skeleton/></p>
                                    </div>
                                </div>
                            </div>)
                            :(<p className='my-auto px-2 text-xl text-orange-400 font-semibold'>Get scraping! Your results will display here!</p>))}
                        </div>)}
            </div>
    </div>
    )
}

export default DisplayBoxes