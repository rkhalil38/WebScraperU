import Searchbar from './Components/Searchbar'
import DisplayBoxes from './Components/DisplayBoxes'
import Head from 'next/head'
import Navbar from './Components/Navbar'

export default async function Home() {

  const api_endpoint = "https://web-scraper-u.vercel.app/api/searchbar"
  console.log("romulsu")

  return (
    <main className='flex w-screen h-screen'>
      <div className='flex container h-full w-1/6 bg-orange-400'>
        <Navbar/>
      </div>
      <div className='flex flex-col container h-full w-4/6 bg-orange-400 items-center overflow-scroll'>
        <Searchbar url= { api_endpoint }/>
      </div>
      <div className='flex container h-full w-1/6 bg-orange-400 items center'></div>
    </main>
  )
}
