import Searchbar from './Components/Searchbar'
import Navbar from './Components/Navbar'
import Tutorial from './Components/Tutorial'

require('dotenv').config()

export default async function Home() {

  const api_endpoint = process.env.API_ENDPOINT? process.env.API_ENDPOINT : 'null'

  return (
    <main className='flex w-screen h-screen'>
      <div className='flex container h-full w-1/6 bg-orange-400'>
        <Navbar/>
      </div>
      <div className='flex flex-col container h-full w-4/6 bg-orange-400 items-center overflow-scroll'>
        <Searchbar url= { api_endpoint }/>
        <Tutorial/>
      </div>
      <div className='flex container h-full w-1/6 bg-orange-400 items center'></div>
    </main>
  )
}
