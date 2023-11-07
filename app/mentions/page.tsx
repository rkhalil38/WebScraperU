"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { GoCopy } from 'react-icons/go';

function generateMetaData(title: string, description: string){
    //need to dynamically generate metadata for page title and description
    
}


const Page = () => {

    const [relevantData, setRelevantData] = useState([])
    const [title, setTitle] = useState('')
    const searchParams = useSearchParams()
    const stringIndex: string | null = searchParams.get('index')
    const index: number = parseInt(stringIndex? stringIndex : '0')

    useEffect(() => {
        const data = localStorage.getItem('data')
        setRelevantData(JSON.parse(data? data : '')[index]['mentions'])
        setTitle(JSON.parse(data? data : '')[index]['title'])
    }, [])

    
    return (
        <div className='flex justify-center h-screen w-screen overflow-scroll bg-orange-400'>
            <div className='container flex flex-col my-4 items-center text-black rounded-lg'>
                <div className='container justify-center items-center flex flex-row'>
                    <h1 className='py-4 text-white font-semibold text-2xl mx-4'>Mentions from {title}</h1>
                    <CopyToClipboard text={relevantData.join('\n')}>
                            <button className='h-12 w-12 text-orange-400 text-2xl text-center px-3 hover:bg-gray-200 bg-white rounded-lg'><GoCopy/></button>
                    </CopyToClipboard>
                </div>
                <div className='text-black'>
                    {relevantData.map((data: string, index: number) => (
                    <div key={index} className='container flex flex-row items-center'>
                        <p className='container font-semibold px-4 py-3 my-4 mx-2 bg-white rounded-lg'>{data}</p>
                        <CopyToClipboard text={data}>
                            <button className='h-12 w-12 text-orange-400 text-2xl text-center px-3 hover:bg-gray-200 bg-white rounded-lg'><GoCopy/></button>
                        </CopyToClipboard>
                    </div>))
                }
                </div>
            </div>
        </div>
    )
}

export default Page