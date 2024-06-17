import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full bg-gradient-to-b from-white to-blue-100 h-screen'>
        <Header/>
        {/*<OfferteGen />*/}

        <div className='flex  flex-col gap-6'>
            <h2 className='text-2xl font-bold text-center'>Hoe wil je een offerte genereren?</h2>

            <div className='flex gap-4'>

              <div  
              onClick={() => navigate('/offerte-gen')}
              className='bg-white hover:cursor-pointer hover:scale-[99%] p-4 rounded-md shadow-md flex flex-col gap-2 items-center min-w-[200px]'>
                  <h3 className='font-semibold'>Handmatig</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                  </svg>
              </div>

              <div 
              onClick={() => navigate('/chatbot')}
              className=' bg-white hover:cursor-pointer hover:scale-[99%] p-4 rounded-md gap-2 shadow-md flex flex-col justify-center items-center  min-w-[200px]'>
                <h3 className='font-semibold'>AI</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                </svg>
              </div>
            </div>
        </div>


      </div>
    </>
  )
}

export default Homepage
