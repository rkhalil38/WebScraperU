"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation'


interface ParamData{
    url: string,
    mentions: string[],
    rawMentions: number,
    title: string,
}

const Page = () => {

    const searchParams = useSearchParams()
    const separatorSequence = searchParams.get('separatorSequence')
    console.log(separatorSequence)

    return (
        <div className='flex justify-center h-screen w-screen bg-orange-400'>
            <div className='container flex flex-col items-center text-black w-1/2 h-3/4 bg-white rounded-lg'>
                <h1 className='py-4 font-semibold text-2xl'>Mentions from "{searchParams.get('title')}"</h1>
                {searchParams.get('mentions')?.split(`${separatorSequence}`).map((mention, index) => (
                    <p key={index}>{mention}</p>
                ))}
            </div>
        </div>
    )
}

export default Page