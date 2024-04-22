
import './App.css'
import Header from './components/Header'
import OfferteGenerator from './components/OfferteGenerator'

function App() {

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-300'>
        <Header/>
        <OfferteGenerator />
      </div>
    </>
  )
}

export default App
