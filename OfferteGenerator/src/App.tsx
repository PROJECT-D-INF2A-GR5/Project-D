
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import OffertePage from './pages/OffertePage'
import Chatbot from './pages/Chatbot'
import OfferteGenPage from './pages/OfferteGenPage'
import { testDB } from './api'

function App() {

  testDB('postgresql').then(data => console.log(data))

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/offerte" element={<OffertePage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="offerte-gen" element={<OfferteGenPage />} />
      </Routes>
    </Router>
  )
}

export default App
