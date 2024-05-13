
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import OffertePage from './pages/OffertePage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/offerte" element={<OffertePage />} />
      </Routes>
    </Router>
  )
}

export default App
