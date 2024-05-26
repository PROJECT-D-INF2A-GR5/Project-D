import Header from '../components/Header'
import OfferteGen from '../components/OfferteGen'
import OfferteGenerator from '../components/OfferteGenerator'
import Chatbot from '../pages/Chatbot'

const Homepage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full h-screen '>
        <Header/>
        <OfferteGen />
      </div>
    </>
  )
}

export default Homepage
