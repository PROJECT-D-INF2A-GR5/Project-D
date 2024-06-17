
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import OffertePage from './pages/OffertePage'
import Chatbot from './pages/Chatbot'
import OfferteGenPage from './pages/OfferteGenPage'
import OffertePageTest from './pages/OffertePageTest'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/offerte" element={<OffertePage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="offerte-gen" element={<OfferteGenPage />} />
        <Route path="/test" element={<OffertePageTest/>} />
      </Routes>
    </Router>
  )
}

export default App
