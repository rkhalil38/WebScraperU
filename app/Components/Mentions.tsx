"use client";
import React, { useEffect, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { GoCopy } from 'react-icons/go';
import Head from 'next/head';

const Mentions = () => {


    const [relevantData, setRelevantData] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const data = localStorage.getItem('data')
        setRelevantData(JSON.parse(data? data : '')['mentions'])
        setTitle(JSON.parse(data? data : '')['title'])
    }, [])

    return (
        <div>
            <Head>
                <title>Mentions</title>
            </Head>
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

export default Mentions