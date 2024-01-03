import Mentions from "../Components/Mentions"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mentions | WebScraperU',
    description: 'Mentions from your webscraping.',
    
}

const Page = () => {

    return (
        <div className='flex justify-center h-screen w-screen overflow-scroll bg-gradient-to-b from-orange-400 to-orange-300'>
            <Mentions/>
        </div>
    )
}

export default Page