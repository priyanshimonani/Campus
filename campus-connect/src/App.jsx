import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Events from './pages/Events'
import Login from './pages/Login'
import CommitteeDashboard from './pages/CommitteeDashboard'
import Manage from './pages/Manage'
import StudentLogin from './pages/StudentLogin'
import StudentSignup from './pages/StudentSignup'

function Layout() {
  const location = useLocation()

  return (
    <>
      <div className="bg"></div>

      <Routes>
        <Route path="/slogin" element={<StudentLogin />} />
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<CommitteeDashboard />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/:id" element={<Manage />} />
      </Routes>

      {/* Hide Navbar on student login */}
      {(location.pathname !== "/slogin" || location.pathname !== "/signup") && <Navbar />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
