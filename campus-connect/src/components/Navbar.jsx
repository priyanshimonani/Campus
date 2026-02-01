import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [studentLoggedIn, setStudentLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("studentToken")
    setStudentLoggedIn(!!token)
  }, [])

  const handleStudentLogout = () => {
    localStorage.removeItem("studentToken")
    localStorage.removeItem("student")          // if you store student data later
    localStorage.removeItem("registeredEvents") // optional but correct

    setStudentLoggedIn(false)
    navigate("/")
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="top-0 left-0 w-full z-50 flex justify-center">
        <nav
          className="
            top-4 fixed 
            flex flex-col md:flex-row
            items-center justify-between
            gap-3 md:gap-8
            px-6 py-4
            rounded-full
            container 
            shadow-lg
            transition-all
            w-150
            ml-2 mr-2
          "
        >
          {/* Logo */}
          <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">
            Campus Connect
          </h1>

          {/* Links */}
          <div className="flex gap-6 text-teal-500 font-medium">
            <a className="hover:text-emerald-500 transition" href="/">Home</a>
            <a className="hover:text-emerald-500 transition" href="/about">About</a>
          </div>

          {/* Admin (UNCHANGED) */}
          <a href="/login" className="admin-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              viewBox="0 0 24 24" className='mr-2'>
              <path fill="#fff" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4" />
            </svg>
            Admin
          </a>

          {/* STUDENT LOGIN / LOGOUT */}
          {studentLoggedIn ? (
            <button onClick={handleStudentLogout} className="admin-btn">
              Logout
            </button>
          ) : (
            <a href="/slogin" className="admin-btn">
              Login
            </a>
          )}
        </nav>
      </header>

      {/* SPACER */}
      <div className="h-32 md:h-8"></div>
    </>
  )
}

export default Navbar
