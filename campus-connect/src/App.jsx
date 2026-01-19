import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Events from './pages/Events'
import Login from './pages/Login';
import CommitteeDashboard from './pages/CommitteeDashboard';
import Manage from './pages/Manage';


function App() {
    return (
      <>
      {/* background */}
      <div className="bg"></div>

      {/* background */}



      <Navbar/>
      <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<CommitteeDashboard />} />
      <Route path="/manage" element={<Manage />} />
    </Routes>
    </BrowserRouter>
      </>
    
  )
}

export default App
